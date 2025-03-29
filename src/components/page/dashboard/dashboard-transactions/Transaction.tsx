import IconEditPencil from '@/assets/svg/IconEditPencil';
import IconTrash from '@/assets/svg/IconTrash';
import CustomButton from '@/components/custom/CustomButton';
import { useTags } from '@/hooks/useTags';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionTypes } from '@/hooks/useTransactionTypes';
import { MANAGER_MODALS, MODAL_BASIC_ACTIONS } from '@/lib/constants/modals';
import { TypeTransactionsRegistry } from '@/lib/types/Tables';
import { UtilsFormat } from '@/lib/utils/UtilsFormat';
import { UtilsToast } from '@/lib/utils/UtilsToast';
import { useStoreModalConfirmAction } from '@/stores/modals/useStoreModalConfirmAction';
import { useStoreModalManager } from '@/stores/modals/useStoreModalManager';

export default function Transaction({
  transaction
}: {
  transaction: TypeTransactionsRegistry;
}) {
  const { tags } = useTags();
  const { remove } = useTransactions();
  const { transactionTypes } = useTransactionTypes();
  const openModalConfirmAction = useStoreModalConfirmAction(
    (store) => store.setOpen
  );
  const transactionType = transactionTypes.find(
    (tt) => tt.id === transaction.id_type
  );
  const openModalManageAccount = useStoreModalManager((store) => store.setOpen);
  return (
    <article>
      <header className='flex items-center justify-between gap-2'>
        <p
          className='text-[10px] px-3 py-1 border-l-2 mb-1 block w-max'
          style={{
            backgroundColor: `${transactionType?.color}44`,
            borderColor: `${transactionType?.color}77`
          }}
        >
          {transactionType?.name}
        </p>
        <p className='font-mono text-sm'>
          {UtilsFormat.amountToCurrency(
            (isNaN(Number(transactionType?.operation))
              ? 1
              : Number(transactionType?.operation)) * transaction.amount
          )}
        </p>
      </header>
      <div>
        <p className='text-sm font-medium'>{transaction.name}</p>
        <p className='text-xs text-white/40 truncate'>
          {transaction.description.length > 0 ? transaction.description : '-'}
        </p>
        <section className='mt-2 mb-3 flex items-center gap-4'>
          <div className='flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar'>
            {Array.isArray(transaction?.transaction_tags) &&
              transaction?.transaction_tags?.map((ttag) => {
                const tag = tags.find((t) => t.id === ttag.id_tag);
                if (!tag) return null;
                return (
                  <div
                    key={ttag.id}
                    className='flex items-center gap-2 rounded-full w-max border border-white/40 h-max px-3 py-1'
                    style={{
                      backgroundColor: `${tag.color}77`
                    }}
                  >
                    <span className='text-[10px]'>{tag.name}</span>
                  </div>
                );
              })}
          </div>
          <p className='text-xs text-white/40 ml-auto w-max italic'>
            {UtilsFormat.timestampToTimeAgo(transaction.date)}
          </p>
        </section>
      </div>
      <footer className='flex items-center gap-2'>
        <CustomButton
          className='bg-night-700 flex gap-1 items-center w-max rounded-lg border border-white/40 px-3 py-1 text-xs'
          onClick={() =>
            openModalManageAccount(MANAGER_MODALS.budgetTransaction, {
              data: transaction,
              action: MODAL_BASIC_ACTIONS.edit
            })
          }
        >
          <IconEditPencil size={14} strokeWidth={2.5} />
          Edit
        </CustomButton>
        <CustomButton
          className='bg-night-700 flex gap-1 items-center w-max rounded-lg border border-white/40 px-3 py-1 text-xs'
          onClick={() => {
            openModalConfirmAction({
              title: 'Delete transaction',
              description: (
                <>
                  Are you sure you want to delete the transaction named{' '}
                  <strong>{transaction.name}</strong>?
                </>
              ),
              onConfirm: async () => {
                try {
                  await remove(transaction.id);
                  UtilsToast.success('Transaction deleted');
                } catch {
                  UtilsToast.error(
                    'An error occurred while deleting the transaction'
                  );
                }
              }
            });
          }}
        >
          <IconTrash size={14} strokeWidth={2.5} />
          Delete
        </CustomButton>
      </footer>
    </article>
  );
}
