import IconPlus from '@/assets/svg/IconPlus'
import CustomButton from '@/components/custom/CustomButton'
import { useStoreModalManageAccount } from '@/stores/modals/useStoreModalManageAccount'

export default function DashboardAccounts() {
  const setOpen = useStoreModalManageAccount((store) => store.setOpen)
  return (
    <section className='flex items-center justify-between gap-4 my-2'>
      <CustomButton
        onClick={() => setOpen()}
        className='ml-auto flex items-center gap-1 bg-steel-blue'
      >
        <IconPlus strokeWidth={2.5} /> Budget Account
      </CustomButton>
    </section>
  )
}
