import IconEditPencil from '@/assets/svg/IconEditPencil'
import IconTrash from '@/assets/svg/IconTrash'
import CustomButton from '@/components/custom/CustomButton'
import { useCurrencies } from '@/hooks/useCurrencies'
import { TypeAccountsRegistry } from '@/lib/types/Tables'

export default function BudgetAccount({
  account,
  onRemove,
  onEdit = () => {}
}: {
  account: TypeAccountsRegistry
  onRemove?: () => void
  onEdit?: () => void
}) {
  const { currencies } = useCurrencies()
  const accountCurrency = currencies.find((c) => c.id === account.id_currency)
  return (
    <article
      className='outline outline-solid outline-white/40 border-l-8 border-solid pl-3 pr-5 py-2 bg-night-600 min-w-[180px] max-w-full cursor-pointer rounded-lg relative group'
      title={account.name}
      style={{ borderColor: account.color }}
    >
      <h4 className='text-xs font-semibold'>
        <span className='font-mono'>{accountCurrency?.iso_code}</span> -{' '}
        {account.name}
      </h4>
      <p className='text-[10px] line-clamp-1'>{account.description}</p>
      <CustomButton
        className='sm:hidden group-hover:block p-[6px] rounded-full absolute right-5 -top-4 bg-red-800 border border-solid border-white/40'
        onClick={onRemove}
      >
        <IconTrash strokeWidth={2} size={14} />
      </CustomButton>
      <CustomButton
        className='sm:hidden group-hover:block p-[6px] rounded-full absolute -right-3 -top-4 bg-night-700 border border-solid border-white/40'
        onClick={onEdit}
      >
        <IconEditPencil strokeWidth={2} size={14} />
      </CustomButton>
    </article>
  )
}
