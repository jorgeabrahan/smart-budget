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
import { UtilsToast } from '@/lib/utils/UtilsToast'
import { useBudgetAccounts } from '@/hooks/useBudgetAccounts'

export default function ModalManageAccount() {
  const open = useStoreModalManageAccount((store) => store.open)
  const account = useStoreModalManageAccount((store) => store.account)
  const action = useStoreModalManageAccount((store) => store.action)
  const setClose = useStoreModalManageAccount((store) => store.setClose)
  const { create, isInserting, update, isUpdating } = useBudgetAccounts()
  const { budgetAccounts } = useBudgetAccounts()
  const { currencies, requestStatus } = useCurrencies()
  const callbackOnSuccessFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset()
    setClose()
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    const { name, description, idCurrency, color } = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as TypeFormManageAccount
    if (name.length > 40) {
      UtilsToast.error(
        'Please keep the name of the account under 40 characters'
      )
      return
    }
    const currency = currencies.find((c) => c.id.toString() === idCurrency)
    if (idCurrency === 'default' || !currency) {
      UtilsToast.error('Please select a valid currency')
      return
    }
    if (currency.iso_code !== 'HNL') {
      UtilsToast.error('Currently only HNL is supported as an account currency')
      return
    }
    if (action === MODAL_BASIC_ACTIONS.edit && !account) {
      UtilsToast.error('Please select a budget account to edit')
      return
    }
    const match = budgetAccounts.find(
      (a) =>
        a.name.toLowerCase() === name.trim().toLowerCase() &&
        (action === MODAL_BASIC_ACTIONS.edit && account
          ? a.id !== account.id
          : true)
    )
    if (match) {
      UtilsToast.error('A budget account with this name already exists')
      return
    }
    if (action === MODAL_BASIC_ACTIONS.edit && account) {
      if (
        name.trim().toLowerCase() === account.name.toLowerCase() &&
        description.trim().toLowerCase() ===
          account.description.toLowerCase() &&
        idCurrency === account.id_currency.toString() &&
        color === account.color
      ) {
        UtilsToast.error(
          'Please change at least one field to update the account'
        )
        return
      }
    }

    if (action === MODAL_BASIC_ACTIONS.create) {
      const isSuccess = await create({
        name: name.trim(),
        description,
        id_currency: Number(idCurrency),
        color
      })
      if (isSuccess) {
        return callbackOnSuccessFinish(e)
      }
      UtilsToast.error('Something went wrong')
      return
    }
    if (action === MODAL_BASIC_ACTIONS.edit && account) {
      const isSuccess = await update({
        name: name.trim(),
        description,
        id_currency: Number(idCurrency),
        color
      })
      if (isSuccess) {
        return callbackOnSuccessFinish(e)
      }
      UtilsToast.error('Something went wrong')
      return
    }
  }
  return (
    <WrapperModal
      title={`${
        action === MODAL_BASIC_ACTIONS.create ? 'Create' : 'Edit'
      } budget account`}
      isOpen={open}
      isClosingAllowed={!isInserting || !isUpdating}
      onClose={setClose}
    >
      <form className='space-y-4 mt-4' onSubmit={onSubmit}>
        <CustomInput
          label='Name'
          id='name'
          type='text'
          disabled={isInserting || isUpdating}
          defaultValue={account?.name ?? ''}
          required
        />
        <CustomTextarea
          label='Description'
          id='description'
          rows={3}
          disabled={isInserting || isUpdating}
          defaultValue={account?.description ?? ''}
          required
        />
        <CustomSelect
          label='Currency'
          id='idCurrency'
          options={currencies.map((currency) => ({
            value: currency.id.toString(),
            label: `${currency.iso_code} - ${currency.currency}`
          }))}
          disabled={
            requestStatus === REQUEST_STATUS.loading ||
            isInserting ||
            isUpdating
          }
          defaultValue={account?.id_currency.toString()}
          key={account?.id_currency}
          required
        />
        <CustomInputColor
          label='Color'
          id='color'
          disabled={isInserting || isUpdating}
          defaultValue={account?.color}
          key={account?.color}
        />
        <CustomButton
          type='submit'
          className='flex justify-center items-center gap-1 w-full bg-steel-blue'
          disabled={isInserting || isUpdating}
        >
          Save account
        </CustomButton>
      </form>
    </WrapperModal>
  )
}
