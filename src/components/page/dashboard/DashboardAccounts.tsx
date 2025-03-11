import IconPlus from '@/assets/svg/IconPlus'
import CustomButton from '@/components/custom/CustomButton'
import { useBudgetAccounts } from '@/hooks/useBudgetAccounts'
import { useStoreModalManageAccount } from '@/stores/modals/useStoreModalManageAccount'
import BudgetAccount from './dashboard-accounts/BudgetAccount'
import { useStoreModalConfirmAction } from '@/stores/modals/useStoreModalConfirmAction'

export default function DashboardAccounts() {
  const { budgetAccounts } = useBudgetAccounts()
  const openModalManageAccount = useStoreModalManageAccount(
    (store) => store.setOpen
  )
  const openModalConfirmAction = useStoreModalConfirmAction(
    (store) => store.setOpen
  )
  return (
    <section className='flex overflow-x-auto gap-4 py-4 scrollbar-thin'>
      {budgetAccounts.length > 0 && (
        <CustomButton
          onClick={() => openModalManageAccount()}
          className='bg-night-600 px-4 outline outline-white/40 ml-1'
        >
          <IconPlus strokeWidth={2.5} />
        </CustomButton>
      )}
      {budgetAccounts.map((account) => (
        <BudgetAccount
          key={account.id}
          account={account}
          onRemove={() =>
            openModalConfirmAction({
              title: 'Remove account',
              description: (
                <>
                  Are you sure you want to remove the account named{' '}
                  <strong>{account.name}</strong>?
                </>
              ),
              onConfirm: () => {
                console.log('remove account')
              }
            })
          }
          onEdit={() => openModalManageAccount(account)}
        />
      ))}
      {budgetAccounts.length === 0 && (
        <CustomButton
          onClick={() => openModalManageAccount()}
          className='ml-auto flex items-center gap-1 bg-steel-blue'
        >
          <IconPlus strokeWidth={2.5} />{' '}
          <span className='text-nowrap'>Budget Account</span>
        </CustomButton>
      )}
    </section>
  )
}
