import { useStoreModalManageAccount } from '@/stores/modals/useStoreModalManageAccount'
import WrapperModal from '../wrapper/WrapperModal'
import { MODAL_BASIC_ACTIONS } from '@/lib/constants/modals'
import CustomInput from '../custom/CustomInput'
import CustomTextarea from '../custom/CustomTextarea'
import CustomSelect from '../custom/CustomSelect'
import { useCurrencies } from '@/hooks/useCurrencies'
import { REQUEST_STATUS } from '@/lib/constants/requests'
import CustomButton from '../custom/CustomButton'
import { TypeFormManageAccount } from '@/lib/types/Forms'
import CustomInputColor from '../custom/CustomInputColor'

export default function ModalManageAccount() {
  const open = useStoreModalManageAccount((store) => store.open)
  const action = useStoreModalManageAccount((store) => store.action)
  const setClose = useStoreModalManageAccount((store) => store.setClose)
  const { currencies, requestStatus } = useCurrencies()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, description, idCurrency, color } = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as TypeFormManageAccount
    console.log({ name, description, idCurrency, color })
  }
  return (
    <WrapperModal
      title={`${
        action === MODAL_BASIC_ACTIONS.create ? 'Create' : 'Edit'
      } budget account`}
      isOpen={open}
      onClose={setClose}
    >
      <form className='space-y-4 mt-4' onSubmit={onSubmit}>
        <CustomInput label='Name' id='name' type='text' required />
        <CustomTextarea
          label='Description'
          id='description'
          rows={3}
          required
        />
        <CustomSelect
          label='Currency'
          id='idCurrency'
          options={currencies.map((currency) => ({
            value: currency.id.toString(),
            label: `${currency.iso_code} - ${currency.currency}`
          }))}
          disabled={requestStatus === REQUEST_STATUS.loading}
          required
        />
        <CustomInputColor label='Color' id='color' />
        <CustomButton
          type='submit'
          className='flex justify-center items-center gap-1 w-full bg-steel-blue'
        >
          Save account
        </CustomButton>
      </form>
    </WrapperModal>
  )
}
