import IconSuggestion from '@/assets/svg/IconSuggestion';
import { useSignedIn } from '@/hooks/useSignedIn';
import { useMemo, useState } from 'react';
import CustomTextarea from '../custom/CustomTextarea';
import IconSend from '@/assets/svg/IconSend';
import { UtilsToast } from '@/lib/utils/UtilsToast';
import { model } from '@/config/model';
import { marked } from 'marked';
import LoadingDots from '@/assets/svg/LoadingDots';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionTypes } from '@/hooks/useTransactionTypes';
import { useTags } from '@/hooks/useTags';
import { useBudgetAccounts } from '@/hooks/useBudgetAccounts';

export default function AIBubble() {
  const { user } = useSignedIn();
  const { budgetAccounts } = useBudgetAccounts();
  const { tags } = useTags();
  const { transactionTypes } = useTransactionTypes();
  const { transactions, filters } = useTransactions();
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    {
      id: `${string}-${string}-${string}-${string}-${string}`;
      role: 'user' | 'assistant';
      content: string;
      contentRaw: string;
    }[]
  >([]);
  const totals = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const transactionType = transactionTypes.find(
        (type) => type.id === transaction.id_type
      );
      if (!transactionType) return;
      const amount = transaction.amount * Number(transactionType.operation);
      if (transactionType.operation === '1') {
        totalIncome += amount;
        return;
      }
      if (transactionType.operation === '-1') {
        totalExpense += amount;
      }
    });

    const totalBalance = totalIncome + totalExpense;
    return { totalIncome, totalExpense, totalBalance };
  }, [transactions, transactionTypes]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;
    const formEntries = Object.fromEntries(new FormData(form)) as {
      prompt: string;
    };
    if (formEntries.prompt.trim().length === 0) {
      UtilsToast.error('Prompt is required');
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: formEntries.prompt,
        contentRaw: formEntries.prompt
      }
    ]);
    form.reset();
    setIsLoading(true);
    try {
      const contextualPrompt = `
        Here's some info about the user:
        name: ${user?.user_metadata.display_name}
        email: ${user?.user_metadata.email}
        Here are the budget accounts the user has created:
        ${budgetAccounts.map((ba) => ba.name).join(', ')}
        Here are the user transactions for the year ${filters.year}:
        ${transactions.map(
          (t, index) => `
          Transaction ${index + 1}:
          account: ${
            budgetAccounts.find((ba) => ba.id === t.id_budget_account)?.name
          }
          title: ${t.name}
          description: ${t.description}
          amount: ${t.amount}
          type: ${
            transactionTypes.find((tt) => tt.id === t.id_type)?.name ?? ''
          }
        `
        )}
        Here are some of the tags the user has created:
        ${tags.map((tag) => tag.name).join(', ')}
        Here's some information about the user balance:
        total income: ${totals.totalIncome}
        total expenses: ${totals.totalExpense}
        total balance: ${totals.totalBalance}

        Here's the prompt:
        ${formEntries.prompt}
      `;
      console.log(contextualPrompt);
      const result = await model.generateContent(contextualPrompt);
      const rawResponse = result.response.text() ?? '';
      const parsedResponse = await marked.parse(
        rawResponse.replace(/^[\\u200B\\u200C\\u200D\\u200E\\u200F\\uFEFF]/, '')
      );
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: parsedResponse,
          contentRaw: rawResponse
        }
      ]);
    } catch (error) {
      console.error(error);
      UtilsToast.error('No se pudo generar una respuesta');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className='fixed bottom-3 right-2 sm:right-4 lg:right-6 xl:right-8 z-50'>
      {showAIPanel && (
        <div className='absolute bottom-[calc(100%+10px)] right-0 w-[320px] sm:w-[400px] bg-night-700 border border-white/40 rounded-lg p-4'>
          <h3 className='font-semibold text-lg mb-2'>SB Assistant</h3>
          <section className='h-[300px] overflow-y-auto scrollbar-thin space-y-6 py-2 mb-4'>
            {messages.length === 0 && (
              <p className='rounded-lg text-xs leading-6 text-center text-white/60 h-full flex items-center justify-center'>
                I'm SB Assistant, your personal finance assistant. I'm ready to
                help you.
              </p>
            )}
            {messages.length > 0 &&
              messages.map((message) => (
                <div
                  className={`rounded-lg ${
                    message.role === 'user'
                      ? 'ml-auto bg-night-900/40 p-4 max-w-[80%]'
                      : 'max-w-[90%]'
                  }`}
                  key={message.id}
                >
                  {message.role === 'assistant' ? (
                    <div
                      className='text-sm text-white/60 model-response-content'
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></div>
                  ) : (
                    <p className='text-sm'>{message.content}</p>
                  )}
                </div>
              ))}
            {isLoading && <LoadingDots />}
          </section>
          <form className='scrollbar-blue mb-2' onSubmit={onSubmit}>
            <div className='relative'>
              <CustomTextarea label='' id='prompt' rows={3} />
              <button className='bg-night-700 border border-white/40 p-2 absolute right-2 bottom-2 [&>*]:pointer-events-none rounded-lg'>
                <IconSend size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        className='bg-night-700 border border-white/40 p-3 rounded-full hover:scale-110 relative'
        onClick={() => {
          setShowAIPanel(!showAIPanel);
        }}
      >
        <IconSuggestion />
      </button>
    </section>
  );
}
