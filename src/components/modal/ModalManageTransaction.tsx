import { useStoreModalManager } from '@/stores/modals/useStoreModalManager';
import WrapperModal from '../wrapper/WrapperModal';
import { TypeTagsRegistry, TypeTransactionsRegistry } from '@/lib/types/Tables';
import {
  MODAL_BASIC_ACTIONS,
  MANAGER_MODALS,
  BASIC_MODALS
} from '@/lib/constants/modals';
import CustomSelect from '../custom/CustomSelect';
import { useBudgetAccounts } from '@/hooks/useBudgetAccounts';
import CustomInput from '../custom/CustomInput';
import CustomTextarea from '../custom/CustomTextarea';
import { useTransactionTypes } from '@/hooks/useTransactionTypes';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useMemo, useState } from 'react';
import CustomButton from '../custom/CustomButton';
import { useTransactions } from '@/hooks/useTransactions';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeFormManageTransaction } from '@/lib/types/Forms';
import { UtilsToast } from '@/lib/utils/UtilsToast';
import IconPlus from '@/assets/svg/IconPlus';
import IconSettings from '@/assets/svg/IconSettings';
import { useStoreModalBasic } from '@/stores/modals/useStoreModalBasic';
import { useTags } from '@/hooks/useTags';
import TransactionTag from '../general/TransactionTag';
import { useStoreDashboard } from '@/stores/useStoreDashboard';
import { UtilsFormat } from '@/lib/utils/UtilsFormat';
import { UtilsFormValidate } from '@/lib/utils/UtilsFormValidate';

const CURRENT_MONTH = new Date().getMonth() + 1;
const CURRENT_DAY = new Date().getDate();
export default function ModalManageTransaction() {
  const setOpenBasicModal = useStoreModalBasic((store) => store.setOpen);
  const filters = useStoreDashboard((store) => store.filters);
  const modal = useStoreModalManager((store) => store.modal);
  const open = useStoreModalManager((store) => store.open);
  const editingTransaction = useStoreModalManager(
    (store) => store.data
  ) as TypeTransactionsRegistry | null;
  const action = useStoreModalManager((store) => store.action);
  const setClose = useStoreModalManager((store) => store.setClose);
  const [idType, setIdType] = useState<string>(
    editingTransaction?.id_budget_account?.toString() ?? 'default'
  );
  const { budgetAccounts, requestStatus: statusBudgetAccounts } =
    useBudgetAccounts();
  const { transactionTypes, requestStatus: statusTransactionTypes } =
    useTransactionTypes();
  const { currencies, requestStatus: statusCurrencies } = useCurrencies();
  const { tags, requestStatus } = useTags();
  const { create, update, isInserting, isUpdating } = useTransactions();
  const idSelectedAccount = useStoreDashboard(
    (store) => store.idSelectedAccount
  );
  const [tagAutocomplete, setTagAutocomplete] = useState<string>('');
  const [transactionTags, setTransactionTags] = useState<TypeTagsRegistry[]>(
    []
  );
  const isEditingTransaction = useMemo(
    () => action === MODAL_BASIC_ACTIONS.edit && editingTransaction != null,
    [action, editingTransaction]
  );
  const isLoadingTags = useMemo(
    () => requestStatus === REQUEST_STATUS.loading,
    [requestStatus]
  );
  const isLoadingBudgetAccounts = useMemo(
    () => statusBudgetAccounts === REQUEST_STATUS.loading,
    [statusBudgetAccounts]
  );
  const isLoadingTransactionTypes = useMemo(
    () => statusTransactionTypes === REQUEST_STATUS.loading,
    [statusTransactionTypes]
  );
  const isLoadingCurrencies = useMemo(
    () => statusCurrencies === REQUEST_STATUS.loading,
    [statusCurrencies]
  );
  const isPerformingAction = useMemo(
    () => isInserting || isUpdating,
    [isInserting, isUpdating]
  );
  const isLoanTransaction = useMemo(() => {
    const selectedTransactionType = transactionTypes.find(
      (tt) => tt.id.toString() === idType
    );
    if (selectedTransactionType == null) return false;
    return selectedTransactionType.name.toLowerCase().includes('loan');
  }, [transactionTypes, idType]);

  const isCurrentYear = useMemo(() => {
    return filters.year === new Date().getFullYear();
  }, [filters.year]);

  if (modal !== MANAGER_MODALS.budgetTransaction) {
    return null;
  }

  const addTransactionTag = () => {
    if (tagAutocomplete.length === 0) {
      UtilsToast.error('Tag name is required');
      return;
    }
    const tag = tags.find(
      (t) => t.name.toLowerCase() === tagAutocomplete.toLowerCase()
    );
    if (!tag) {
      UtilsToast.error(`Tag with name ${tagAutocomplete} not found`);
      return;
    }
    if (transactionTags.find((t) => t.id === tag.id)) {
      UtilsToast.error(`Tag ${tag.name} already added`);
      return;
    }
    setTransactionTags((prev) => [...prev, tag]);
    setTagAutocomplete('');
  };

  const validate = (form: TypeFormManageTransaction) => {
    const { idType, idBudgetAccount, date, name, description, amount } = form;
    if (!transactionTypes.find((t) => t.id.toString() === idType)) {
      UtilsToast.error('Please select a valid transaction type');
      return false;
    }
    if (!budgetAccounts.find((a) => a.id.toString() === idBudgetAccount)) {
      UtilsToast.error('Please select a valid budget account');
      return false;
    }
    const dateValidation = UtilsFormValidate.date(date);
    if (!dateValidation.isValid) {
      UtilsToast.error(dateValidation.message);
      return false;
    }
    const nameValidation = UtilsFormValidate.length(name, 'transaction name', {
      min: 1,
      max: 40
    });
    if (!nameValidation.isValid) {
      UtilsToast.error(nameValidation.message);
      return false;
    }
    const amountAsNumber = parseFloat(amount);
    if (isNaN(amountAsNumber)) {
      UtilsToast.error('Amount must be a valid number');
      return false;
    }
    if (isLoanTransaction) {
      const interestRateAsNumber = parseFloat(form?.interestRate ?? '');
      const installmentsAsNumber = parseInt(form?.installments ?? '');
      if (isNaN(interestRateAsNumber) || interestRateAsNumber < 1) {
        UtilsToast.error('Interest rate should be a number greater than 1');
        return false;
      }
      if (isNaN(installmentsAsNumber) || installmentsAsNumber < 1) {
        UtilsToast.error('Installments should be an integer greater than 1');
        return false;
      }
    }
    if (action === MODAL_BASIC_ACTIONS.edit && editingTransaction != null) {
      const isDateStillTheSame = date === editingTransaction.date.toString();
      const isNameStillTheSame =
        name.trim().toLowerCase() === editingTransaction.name.toLowerCase();
      const isDescriptionStillTheSame =
        description.trim().toLowerCase() ===
        editingTransaction.description.toLowerCase();
      const isAmountStillTheSame =
        parseFloat(amount) === editingTransaction.amount;
      const isInterestRateStillTheSame =
        parseFloat(form?.interestRate ?? '') ===
        editingTransaction.transaction_loan_details?.interest_rate;
      const isInstallmentsStillTheSame =
        parseInt(form?.installments ?? '') ===
        editingTransaction?.transaction_loan_details?.installments;
      let isEverythingStillTheSame =
        isDateStillTheSame &&
        isNameStillTheSame &&
        isDescriptionStillTheSame &&
        isAmountStillTheSame;
      if (isLoanTransaction) {
        isEverythingStillTheSame =
          isEverythingStillTheSame &&
          isInterestRateStillTheSame &&
          isInstallmentsStillTheSame;
      }
      if (isEverythingStillTheSame) {
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
    ) as unknown as TypeFormManageTransaction;
    if (!validate(formEntries)) return;
    const transaction = {
      name: formEntries.name.trim(),
      description: formEntries.description.trim(),
      amount: parseFloat(formEntries.amount),
      id_type: parseInt(formEntries.idType),
      id_budget_account: parseInt(formEntries.idBudgetAccount),
      date: formEntries.date
    };
    const transactionLoanDetails =
      isLoanTransaction && formEntries.interestRate && formEntries.installments
        ? {
            interest_rate: parseFloat(formEntries.interestRate),
            installments: parseInt(formEntries.installments)
          }
        : null;
    let isSuccess = false;
    if (action === MODAL_BASIC_ACTIONS.create) {
      isSuccess = await create(transaction, {
        transactionLoanDetails: transactionLoanDetails,
        transactionTags: transactionTags.map((tag) => tag.id)
      });
    }
    if (action === MODAL_BASIC_ACTIONS.edit && editingTransaction != null) {
      // TODO: currently only updating the transaction is possible
      // user should also be able to update the transaction loan details and tags
      isSuccess = await update({
        ...transaction,
        id: editingTransaction.id,
        id_user: editingTransaction.id_user
      });
    }
    if (isSuccess) {
      form.reset();
      setClose();
      return;
    }
    UtilsToast.error('Something went wrong');
  };
  const CURRENT_DATE = `${filters.year}-${UtilsFormat.normalizeToTwoDigits(
    CURRENT_MONTH
  )}-${UtilsFormat.normalizeToTwoDigits(CURRENT_DAY)}`;
  return (
    <WrapperModal
      title={`${
        action === MODAL_BASIC_ACTIONS.create ? 'Create' : 'Edit'
      } transaction`}
      isOpen={open}
      isClosingAllowed={!isInserting || !isUpdating}
      onClose={setClose}
    >
      <form className='space-y-4 mt-4' onSubmit={onSubmit}>
        <div className='space-y-4 mb-4 overflow-y-auto max-h-[350px] scrollbar-thin'>
          <CustomSelect
            label='Type'
            id='idType'
            options={transactionTypes.map((type) => ({
              value: type.id.toString(),
              label: type.name
            }))}
            disabled={
              isLoadingTransactionTypes ||
              isPerformingAction ||
              isEditingTransaction
            }
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            key={editingTransaction?.id_type}
            required
          />
          <CustomSelect
            label='Account'
            id='idBudgetAccount'
            options={budgetAccounts.map((account) => ({
              value: account.id.toString(),
              label: `${
                currencies.find((c) => c.id === account.id_currency)?.iso_code
              } - ${account.name}`
            }))}
            disabled={
              isLoadingBudgetAccounts ||
              isLoadingCurrencies ||
              isPerformingAction ||
              isEditingTransaction
            }
            defaultValue={
              isEditingTransaction
                ? editingTransaction?.id_budget_account.toString()
                : idSelectedAccount?.toString()
            }
            key={
              isEditingTransaction
                ? editingTransaction?.id_budget_account.toString()
                : idSelectedAccount?.toString()
            }
            required
          />
          <CustomInput
            label='Date'
            id='date'
            type='date'
            disabled={isPerformingAction}
            defaultValue={
              editingTransaction?.date ?? isCurrentYear
                ? CURRENT_DATE
                : `${filters.year}-01-01`
            }
            min={`${filters.year}-01-01`}
            max={`${filters.year}-12-31`}
            required
          />
          <CustomInput
            label='Name'
            id='name'
            type='text'
            disabled={isPerformingAction}
            defaultValue={editingTransaction?.name ?? ''}
            required
          />
          <CustomTextarea
            label='Description'
            id='description'
            rows={3}
            disabled={isPerformingAction}
            defaultValue={editingTransaction?.description ?? ''}
            required
          />
          <CustomInput
            label='Amount'
            id='amount'
            type='text'
            disabled={isPerformingAction}
            defaultValue={editingTransaction?.amount ?? ''}
            required
          />
          {isLoanTransaction && (
            <>
              <CustomInput
                label='Loan interest rate'
                id='interestRate'
                type='text'
                disabled={isPerformingAction}
                defaultValue={
                  editingTransaction?.transaction_loan_details?.interest_rate ??
                  ''
                }
                required
              />
              <CustomInput
                label='Loan installments'
                id='installments'
                type='text'
                disabled={isPerformingAction}
                defaultValue={
                  editingTransaction?.transaction_loan_details?.installments ??
                  ''
                }
                required
              />
            </>
          )}
          <div className='flex items-stretch gap-2'>
            <CustomInput
              containerClassName='flex-1'
              label='Tag'
              id='tagAutocomplete'
              list='tags'
              type='text'
              value={tagAutocomplete}
              onChange={(e) => setTagAutocomplete(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
                if (
                  !(e.target instanceof HTMLInputElement) ||
                  e.key !== 'Enter' ||
                  !e.target.value
                ) {
                  return;
                }
                addTransactionTag();
              }}
              disabled={
                isPerformingAction || isLoadingTags || tags.length === 0
              }
            />
            <datalist id='tags'>
              {tags
                .filter((t) => !transactionTags.find((tag) => tag.id === t.id))
                .map((tag) => (
                  <option key={tag.id} value={tag.name} />
                ))}
            </datalist>
            <CustomButton
              className='bg-night-700 flex gap-1 items-center w-max rounded-lg border border-white/40 px-4 py-1 text-xs [&>*]:pointer-events-none'
              disabled={
                isPerformingAction || isLoadingTags || tags.length === 0
              }
              onClick={addTransactionTag}
            >
              <IconPlus />
            </CustomButton>
            <CustomButton
              className='bg-night-700 flex gap-1 items-center w-max rounded-lg border border-white/40 px-4 py-1 text-xs [&>*]:pointer-events-none'
              disabled={isPerformingAction || isLoadingTags}
              onClick={() => {
                setOpenBasicModal(BASIC_MODALS.tags);
              }}
            >
              <IconSettings />
            </CustomButton>
          </div>
          <div className='flex flex-wrap gap-2 justify-start'>
            {transactionTags.map((tag) => (
              <TransactionTag
                key={tag.id}
                tag={tag}
                isDisabled={isPerformingAction}
                onRemove={() => {
                  setTransactionTags((prev) =>
                    prev.filter((t) => t.id !== tag.id)
                  );
                }}
              />
            ))}
          </div>
        </div>
        <CustomButton
          type='submit'
          className='flex justify-center items-center gap-1 w-full bg-steel-blue'
          disabled={isPerformingAction}
        >
          Save transaction
        </CustomButton>
      </form>
    </WrapperModal>
  );
}
