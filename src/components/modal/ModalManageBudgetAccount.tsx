import WrapperModal from '../wrapper/WrapperModal';
import { MODAL_BASIC_ACTIONS, MANAGER_MODALS } from '@/lib/constants/modals';
import CustomInput from '../custom/CustomInput';
import CustomTextarea from '../custom/CustomTextarea';
import CustomSelect from '../custom/CustomSelect';
import { useCurrencies } from '@/hooks/useCurrencies';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import CustomButton from '../custom/CustomButton';
import { TypeFormManageAccount } from '@/lib/types/Forms';
import CustomInputColor from '../custom/CustomInputColor';
import { UtilsToast } from '@/lib/utils/UtilsToast';
import { useBudgetAccounts } from '@/hooks/useBudgetAccounts';
import { useStoreModalManager } from '@/stores/modals/useStoreModalManager';
import { TypeBudgetAccountsRegistry } from '@/lib/types/Tables';
import { UtilsFormValidate } from '@/lib/utils/UtilsFormValidate';

export default function ModalManageAccount() {
  const modal = useStoreModalManager((store) => store.modal);
  const open = useStoreModalManager((store) => store.open);
  const editingBudgetAccount = useStoreModalManager(
    (store) => store.data
  ) as TypeBudgetAccountsRegistry | null;
  const action = useStoreModalManager((store) => store.action);
  const setClose = useStoreModalManager((store) => store.setClose);
  const { budgetAccounts, create, isInserting, update, isUpdating } =
    useBudgetAccounts();
  const { currencies, requestStatus } = useCurrencies();

  if (modal !== MANAGER_MODALS.budgetAccount) {
    return null;
  }

  const validate = (form: TypeFormManageAccount) => {
    const { name, description, idCurrency, color } = form;
    const nameValidation = UtilsFormValidate.length(name, 'account name', {
      min: 1,
      max: 40
    });
    if (!nameValidation.isValid) {
      UtilsToast.error(nameValidation.message);
      return false;
    }
    if (color.length !== 7) {
      UtilsToast.error('Color must be a valid hexadecimal color');
      return false;
    }
    const currency = currencies.find((c) => c.id.toString() === idCurrency);
    if (idCurrency === 'default' || !currency) {
      UtilsToast.error('Currency is not valid');
      return false;
    }
    if (currency.iso_code !== 'HNL') {
      UtilsToast.error('Currency is not supported, only HNL is supported');
      return false;
    }
    const isDuplicatedName = budgetAccounts.find((a) => {
      const isSameName = a.name.toLowerCase() === name.trim().toLowerCase();
      const isEditing = action === MODAL_BASIC_ACTIONS.edit;
      const isAccountToEditPresent = editingBudgetAccount != null;
      const isTheEditedAccount = a.id === editingBudgetAccount?.id;
      return (
        isSameName &&
        (isEditing && isAccountToEditPresent ? !isTheEditedAccount : true)
      );
    });
    if (isDuplicatedName) {
      UtilsToast.error("Account name can't be duplicated");
      return false;
    }
    if (action === MODAL_BASIC_ACTIONS.edit && editingBudgetAccount) {
      const isNameStillTheSame =
        name.trim().toLowerCase() === editingBudgetAccount.name.toLowerCase();
      const isDescriptionStillTheSame =
        description.trim().toLowerCase() ===
        editingBudgetAccount.description.toLowerCase();
      const isCurrencyStillTheSame =
        idCurrency === editingBudgetAccount.id_currency.toString();
      const isColorStillTheSame = color === editingBudgetAccount.color;
      if (
        isNameStillTheSame &&
        isDescriptionStillTheSame &&
        isCurrencyStillTheSame &&
        isColorStillTheSame
      ) {
        UtilsToast.error("There's nothing to update");
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;
    const formEntries = Object.fromEntries(
      new FormData(form)
    ) as unknown as TypeFormManageAccount;
    if (!validate(formEntries)) return;
    const budgetAction = {
      name: formEntries.name.trim(),
      description: formEntries.description.trim(),
      id_currency: Number(formEntries.idCurrency),
      color: formEntries.color
    };
    let isSuccess = false;
    if (action === MODAL_BASIC_ACTIONS.create) {
      isSuccess = await create(budgetAction);
    }
    if (action === MODAL_BASIC_ACTIONS.edit && editingBudgetAccount) {
      isSuccess = await update({
        ...budgetAction,
        id: editingBudgetAccount.id,
        id_user: editingBudgetAccount.id_user
      });
    }
    if (isSuccess) {
      form.reset();
      setClose();
      return;
    }
    UtilsToast.error('Something went wrong');
  };
  const isLoadingCurrencies = requestStatus === REQUEST_STATUS.loading;
  const isPerformingAction = isInserting || isUpdating;
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
          disabled={isPerformingAction}
          defaultValue={editingBudgetAccount?.name ?? ''}
          required
        />
        <CustomTextarea
          label='Description'
          id='description'
          rows={3}
          disabled={isPerformingAction}
          defaultValue={editingBudgetAccount?.description ?? ''}
          required
        />
        <CustomSelect
          label='Currency'
          id='idCurrency'
          options={currencies.map((currency) => ({
            value: currency.id.toString(),
            label: `${currency.iso_code} - ${currency.currency}`
          }))}
          disabled={isLoadingCurrencies || isPerformingAction}
          defaultValue={editingBudgetAccount?.id_currency.toString()}
          key={editingBudgetAccount?.id_currency}
          required
        />
        <CustomInputColor
          label='Color'
          id='color'
          disabled={isPerformingAction}
          defaultValue={editingBudgetAccount?.color}
          key={editingBudgetAccount?.color}
          required
        />
        <CustomButton
          type='submit'
          className='flex justify-center items-center gap-1 w-full bg-steel-blue'
          disabled={isPerformingAction}
        >
          Save account
        </CustomButton>
      </form>
    </WrapperModal>
  );
}
