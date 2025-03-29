import IconPlus from '@/assets/svg/IconPlus';
import CustomButton from '@/components/custom/CustomButton';
import { useBudgetAccounts } from '@/hooks/useBudgetAccounts';
import { MANAGER_MODALS } from '@/lib/constants/modals';
import { useStoreModalConfirmAction } from '@/stores/modals/useStoreModalConfirmAction';
import { useStoreModalManager } from '@/stores/modals/useStoreModalManager';
import BudgetAccount from './dashboard-accounts/BudgetAccount';
// import { useStoreSignedInUser } from '@/stores/useStoreSignedInUser';
// import { usePlans } from '@/hooks/usePlans';

export default function DashboardAccounts() {
  // const user = useStoreSignedInUser((store) => store.user);
  // const { plans } = usePlans();
  const { budgetAccounts, remove, isDeleting } = useBudgetAccounts();
  const openModalManageAccount = useStoreModalManager((store) => store.setOpen);
  const openModalConfirmAction = useStoreModalConfirmAction(
    (store) => store.setOpen
  );
  // const userPlan = plans.find((p) => p.id === user?.id_plan);
  // console.log(budgetAccounts);
  // console.log(userPlan);
  return (
    <section className='flex overflow-x-auto gap-4 pb-2 pt-4 pr-2 scrollbar-thin mb-10'>
      {budgetAccounts.length > 0 && (
        <CustomButton
          onClick={() => openModalManageAccount(MANAGER_MODALS.budgetAccount)}
          className='bg-night-600 px-4 outline outline-white/40 ml-[1px]'
        >
          <IconPlus strokeWidth={2.5} />
        </CustomButton>
      )}
      {budgetAccounts.map((account) => (
        <BudgetAccount
          key={account.id}
          account={account}
          isLoading={isDeleting}
          onRemove={() =>
            openModalConfirmAction({
              title: 'Remove account',
              description: (
                <>
                  Are you sure you want to remove the account named{' '}
                  <strong>{account.name}</strong>?
                  <br />
                  <br />
                  This will also remove all the transactions associated with
                  this account.
                </>
              ),
              onConfirm: () => {
                remove(account.id);
              }
            })
          }
          onEdit={() =>
            openModalManageAccount(MANAGER_MODALS.budgetAccount, {
              data: account
            })
          }
        />
      ))}
      {budgetAccounts.length === 0 && (
        <div className='h-[calc(100vh-72px)] w-full flex flex-col items-center justify-center gap-4'>
          <p className='font-medium text-lg text-center'>
            Let's start by creating your first budget account
          </p>
          <CustomButton
            onClick={() => openModalManageAccount(MANAGER_MODALS.budgetAccount)}
            className='flex items-center gap-1 bg-steel-blue'
          >
            <IconPlus strokeWidth={2.5} />{' '}
            <span className='text-nowrap'>Budget Account</span>
          </CustomButton>
        </div>
      )}
    </section>
  );
}
