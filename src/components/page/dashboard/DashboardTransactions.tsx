import IconPlus from '@/assets/svg/IconPlus';
import CustomButton from '@/components/custom/CustomButton';
import CustomCondensedSelect from '@/components/custom/CustomCondensedSelect';
import { MANAGER_MODALS } from '@/lib/constants/modals';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import { useStoreModalManager } from '@/stores/modals/useStoreModalManager';
import { useStoreBudgetAccounts } from '@/stores/useStoreBudgetAccounts';
import { useStoreCurrencies } from '@/stores/useStoreCurrencies';
import { useStoreDashboard } from '@/stores/useStoreDashboard';
import { useEffect, useMemo } from 'react';

const CURRENT_YEAR = new Date().getFullYear();
export default function DashboardTransactions() {
  const currencies = useStoreCurrencies((store) => store.currencies);
  const statusCurrencies = useStoreCurrencies((store) => store.requestStatus);
  const budgetAccounts = useStoreBudgetAccounts(
    (store) => store.budgetAccounts
  );
  const statusBudgetAccounts = useStoreBudgetAccounts(
    (store) => store.requestStatus
  );
  const idSelectedAccount = useStoreDashboard(
    (store) => store.idSelectedAccount
  );
  const setIdSelectedAccount = useStoreDashboard(
    (store) => store.setIdSelectedAccount
  );
  const filters = useStoreDashboard((store) => store.filters);
  const setFilters = useStoreDashboard((store) => store.setFilters);
  const openModalManageAccount = useStoreModalManager((store) => store.setOpen);
  useEffect(() => {
    if (budgetAccounts.length === 0) {
      setFilters({
        year: null
      });
      return;
    }
    setFilters({
      year: CURRENT_YEAR
    });
  }, [budgetAccounts, setFilters]);
  const isLoadingBudgetAccounts = useMemo(
    () => statusBudgetAccounts === REQUEST_STATUS.loading,
    [statusBudgetAccounts]
  );
  const isLoadingCurrencies = useMemo(
    () => statusCurrencies === REQUEST_STATUS.loading,
    [statusCurrencies]
  );
  if (filters.year == null) {
    return null;
  }
  return (
    <>
      <header className='flex items-stretch overflow-x-auto scrollbar-thin pb-2 gap-2'>
        <CustomCondensedSelect
          label='Account'
          id='idSelectedAccount'
          value={
            idSelectedAccount == null ? 'all' : idSelectedAccount.toString()
          }
          onChange={(e) => {
            const idSelectedAccount = e.target.value;
            setFilters({ year: CURRENT_YEAR });
            if (idSelectedAccount === 'all') {
              setIdSelectedAccount(null);
              return;
            }
            setIdSelectedAccount(Number(idSelectedAccount));
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
          disabled={isLoadingBudgetAccounts || isLoadingCurrencies}
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
    </>
  );
}
