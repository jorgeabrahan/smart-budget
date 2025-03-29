import IconPlus from '@/assets/svg/IconPlus';
import CustomButton from '@/components/custom/CustomButton';
import CustomCondensedSelect from '@/components/custom/CustomCondensedSelect';
import { useTransactions } from '@/hooks/useTransactions';
import { MANAGER_MODALS } from '@/lib/constants/modals';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeTransactionsRegistry } from '@/lib/types/Tables';
import { useStoreModalManager } from '@/stores/modals/useStoreModalManager';
import { useStoreBudgetAccounts } from '@/stores/useStoreBudgetAccounts';
import { useStoreCurrencies } from '@/stores/useStoreCurrencies';
import { useStoreTransactions } from '@/stores/useStoreTransactions';
import { useEffect, useMemo } from 'react';
import Transaction from './dashboard-transactions/Transaction';
import { useTransactionTypes } from '@/hooks/useTransactionTypes';
import { UtilsFormat } from '@/lib/utils/UtilsFormat';

const CURRENT_YEAR = new Date().getFullYear();
export default function DashboardTransactions() {
  const { transactionTypes } = useTransactionTypes();
  const { transactions, filters } = useTransactions();
  const setFilters = useStoreTransactions((store) => store.setFilters);
  const currencies = useStoreCurrencies((store) => store.currencies);
  const statusCurrencies = useStoreCurrencies((store) => store.requestStatus);
  const budgetAccounts = useStoreBudgetAccounts(
    (store) => store.budgetAccounts
  );
  const statusBudgetAccounts = useStoreBudgetAccounts(
    (store) => store.requestStatus
  );
  const openModalManageAccount = useStoreModalManager((store) => store.setOpen);
  useEffect(() => {
    if (statusBudgetAccounts !== REQUEST_STATUS.success) return;
    if (budgetAccounts.length === 0) {
      setFilters({
        year: null
      });
      return;
    }
    setFilters({
      year: CURRENT_YEAR
    });
  }, [statusBudgetAccounts, budgetAccounts.length]);
  const isLoadingBudgetAccounts = useMemo(
    () => statusBudgetAccounts === REQUEST_STATUS.loading,
    [statusBudgetAccounts]
  );
  const isLoadingCurrencies = useMemo(
    () => statusCurrencies === REQUEST_STATUS.loading,
    [statusCurrencies]
  );
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
  if (filters.year == null) {
    return null;
  }
  const groupedTransactions = transactions.reduce<
    Record<string, TypeTransactionsRegistry[]>
  >((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(transaction);
    return acc;
  }, {});
  return (
    <>
      <header className='flex items-stretch overflow-x-auto scrollbar-thin pb-2 gap-2 mb-6'>
        <CustomCondensedSelect
          label='Account'
          id='idSelectedAccount'
          value={
            filters.idAccount == null ? 'all' : filters.idAccount.toString()
          }
          onChange={(e) => {
            const idSelectedAccount = e.target.value;
            if (idSelectedAccount === 'all') {
              setFilters({ year: CURRENT_YEAR, idAccount: null });
              return;
            }
            setFilters({
              year: CURRENT_YEAR,
              idAccount: Number(idSelectedAccount)
            });
          }}
          options={[{ value: 'all', label: 'All' }].concat(
            budgetAccounts.map((account) => ({
              value: account.id.toString(),
              label: `${
                currencies.find((c) => c.id === account.id_currency)?.iso_code
              } - ${account.name}`
            }))
          )}
          disabled={isLoadingBudgetAccounts || isLoadingCurrencies}
        />
        <CustomCondensedSelect
          label='Year'
          id='selectedYear'
          value={filters.year}
          onChange={(e) => setFilters({ year: Number(e.target.value) })}
          options={[{ value: '2025', label: '2025' }]}
        />
        <CustomButton
          className='bg-night-700 flex gap-1 items-center w-max rounded-lg border border-white/40 px-3 py-1 text-xs ml-auto'
          onClick={() =>
            openModalManageAccount(MANAGER_MODALS.budgetTransaction)
          }
        >
          <IconPlus size={14} strokeWidth={2.5} />{' '}
          <span className='text-nowrap'>New transaction</span>
        </CustomButton>
      </header>
      <div className='space-y-4 mb-8'>
        {Object.keys(groupedTransactions).map((month) => (
          <div key={month} className='space-y-2'>
            <div className='relative mb-4'>
              <div className='h-[1px] w-full bg-white/40'></div>
              <h3 className='absolute left-4 -top-2 bg-night px-2 text-xs font-medium text-white/40'>
                {month}
              </h3>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6'>
              {groupedTransactions[month].map((t) => (
                <Transaction key={t.id} transaction={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {transactions.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mb-8'>
          <div className='p-4 border rounded-lg bg-green-100'>
            <h4 className='text-lg font-semibold text-green-800'>
              Total Income
            </h4>
            <p className='text-xl font-bold text-green-900'>
              {UtilsFormat.amountToCurrency(totals.totalIncome)}
            </p>
          </div>
          <div className='p-4 border rounded-lg bg-red-100'>
            <h4 className='text-lg font-semibold text-red-800'>
              Total Expense
            </h4>
            <p className='text-xl font-bold text-red-900'>
              {UtilsFormat.amountToCurrency(totals.totalExpense)}
            </p>
          </div>
          <div className='p-4 border rounded-lg bg-blue-100'>
            <h4 className='text-lg font-semibold text-blue-800'>
              Total Balance
            </h4>
            <p className='text-xl font-bold text-blue-900'>
              {UtilsFormat.amountToCurrency(totals.totalBalance)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
