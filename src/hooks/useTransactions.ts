import { useEffect, useState } from 'react';
import { useSignedIn } from './useSignedIn';
import { ServiceTransaction } from '@/services/ServiceTransaction';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import { useStoreTransactions } from '@/stores/useStoreTransactions';
import {
  TypeTransactionLoanDetailsRegistry,
  TypeTransactionsRegistry,
  TypeTransactionTagsRegistry
} from '@/lib/types/Tables';

export const useTransactions = () => {
  const { user } = useSignedIn();
  const transactions = useStoreTransactions((store) => store.transactions);
  const requestStatus = useStoreTransactions((store) => store.requestStatus);
  const setTransactions = useStoreTransactions(
    (store) => store.setTransactions
  );
  const addTransaction = useStoreTransactions((store) => store.addTransaction);
  const updateTransaction = useStoreTransactions(
    (store) => store.updateTransaction
  );
  const removeTransaction = useStoreTransactions(
    (store) => store.removeTransaction
  );
  const setRequestStatus = useStoreTransactions(
    (store) => store.setRequestStatus
  );
  const filters = useStoreTransactions((store) => store.filters);
  const [currentFilters, setCurrentFilters] = useState<{
    idAccount: number | null;
    idTags: number[];
    year: number | null;
  }>({
    idAccount: null,
    idTags: [],
    year: null
  });
  const [isInserting, setIsInserting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const create = async (
    transaction: Omit<
      TypeTransactionsRegistry,
      'id' | 'id_user' | 'created_at' | 'id_parent_transaction'
    >,
    additional: {
      transactionLoanDetails: Omit<
        TypeTransactionLoanDetailsRegistry,
        'id' | 'id_transaction'
      > | null;
      transactionTags: number[];
    } = {
      transactionLoanDetails: null,
      transactionTags: []
    }
  ): Promise<boolean> => {
    if (!user) return false;
    setIsInserting(true);
    const { data, error } = await ServiceTransaction.create({
      ...transaction,
      id_user: user.id
    });
    if (!data || error) {
      setIsInserting(false);
      return false;
    }
    let fullTransaction = data;
    if (additional.transactionLoanDetails) {
      const { data: loanDetails, error: errorLoanDetails } =
        await ServiceTransaction.createLoanDetails({
          id_transaction: data.id,
          ...additional.transactionLoanDetails
        });
      if (!loanDetails || errorLoanDetails) {
        // if adding loan details to the transaction failed, since the transaction was already created
        // it should be removed from the database
        await ServiceTransaction.remove(data.id);
        setIsInserting(false);
        return false;
      }
      fullTransaction = {
        ...fullTransaction,
        transaction_loan_details: loanDetails
      };
    }
    if (additional.transactionTags && additional.transactionTags.length > 0) {
      try {
        const tagPromises = additional.transactionTags.map((tagId) =>
          ServiceTransaction.createTag({
            id_transaction: data.id,
            id_tag: tagId
          })
        );
        const createdTags = await Promise.all(tagPromises);
        const transactionTags = createdTags
          .map((result) => result.data)
          .filter((tag): tag is TypeTransactionTagsRegistry => !!tag);
        fullTransaction = {
          ...fullTransaction,
          transaction_tags: transactionTags
        };
      } catch {
        // if creating the transaction tags failed, since the transaction was already created
        // it should be removed from the database
        await ServiceTransaction.remove(data.id);
        setIsInserting(false);
        return false;
      }
    }
    addTransaction(fullTransaction);
    setIsInserting(false);
    return true;
  };
  const update = async (
    budgetAccount: Omit<
      TypeTransactionsRegistry,
      'created_at' | 'id_parent_transaction'
    >
  ): Promise<boolean> => {
    if (!user) return false;
    setIsUpdating(true);
    const { data, error } = await ServiceTransaction.update(budgetAccount);
    if (!data || error) {
      setIsUpdating(false);
      return false;
    }
    updateTransaction(data);
    setIsUpdating(false);
    return true;
  };
  const remove = async (id: number) => {
    if (!user) return false;
    setIsDeleting(true);
    const { data, error } = await ServiceTransaction.remove(id);
    if (error || data === false) {
      setIsDeleting(false);
      return false;
    }
    removeTransaction(id);
    setIsDeleting(false);
    return true;
  };
  useEffect(() => {
    if (
      !user ||
      filters.year == null ||
      requestStatus === REQUEST_STATUS.loading
    ) {
      return;
    }

    const loadTransactions = async (idUser: string, year: number) => {
      const { data, error } = await ServiceTransaction.findAll(idUser, year, {
        idAccount: filters.idAccount,
        idTags: filters.idTags
      });
      if (error || !data) return setRequestStatus(REQUEST_STATUS.error);
      setTransactions(data);
      setRequestStatus(REQUEST_STATUS.success);
    };
    if (
      currentFilters.year === filters.year &&
      currentFilters.idAccount === filters.idAccount &&
      currentFilters.idTags.length === filters.idTags.length &&
      transactions.length > 0
    ) {
      return;
    }
    setRequestStatus(REQUEST_STATUS.loading);
    loadTransactions(user.id, filters.year);
  }, [
    user,
    filters,
    transactions,
    requestStatus,
    setRequestStatus,
    currentFilters,
    setTransactions
  ]);
  return {
    transactions,
    requestStatus,
    setCurrentFilters,
    isInserting,
    isUpdating,
    isDeleting,
    create,
    update,
    remove
  };
};
