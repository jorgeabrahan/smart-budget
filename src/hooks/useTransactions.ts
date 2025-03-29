import { useCallback, useEffect, useState } from 'react';
import { useSignedIn } from './useSignedIn';
import { ServiceTransaction } from '@/services/ServiceTransaction';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import {
  TypeTransactionsFilters,
  useStoreTransactions
} from '@/stores/useStoreTransactions';
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
    >,
    additional: {
      transactionLoanDetails: TypeTransactionLoanDetailsRegistry | null;
      transactionTags: number[];
      currentTransactionTags: TypeTransactionTagsRegistry[];
    } = {
      transactionLoanDetails: null,
      transactionTags: [],
      currentTransactionTags: []
    }
  ): Promise<boolean> => {
    if (!user) return false;
    setIsUpdating(true);
    const { data, error } = await ServiceTransaction.update(budgetAccount);
    if (!data || error) {
      setIsUpdating(false);
      return false;
    }
    let fullTransaction = data;
    if (
      additional.transactionLoanDetails?.id &&
      additional.transactionLoanDetails?.id_transaction
    ) {
      const { data: loanDetails, error: errorLoanDetails } =
        await ServiceTransaction.updateLoanDetails(
          additional.transactionLoanDetails
        );
      if (!loanDetails || errorLoanDetails) {
        setIsInserting(false);
        return false;
      }
      fullTransaction = {
        ...fullTransaction,
        transaction_loan_details: loanDetails
      };
    }
    const currentTagIds = additional.currentTransactionTags.map(
      (tag) => tag.id_tag
    );
    const tagsToAdd = additional.transactionTags.filter(
      (tagId) => !currentTagIds.includes(tagId)
    );
    const tagsToRemove = additional.currentTransactionTags.filter(
      (tag) => !additional.transactionTags.includes(tag.id_tag)
    );
    try {
      let newTags: TypeTransactionTagsRegistry[] = [];
      if (tagsToAdd.length > 0) {
        const addPromises = tagsToAdd.map((tagId) =>
          ServiceTransaction.createTag({
            id_transaction: data.id,
            id_tag: tagId
          })
        );
        const createdTags = await Promise.all(addPromises);
        newTags = createdTags
          .map((res) => res.data)
          .filter((tag): tag is TypeTransactionTagsRegistry => !!tag);
      }
      if (tagsToRemove.length > 0) {
        const removePromises = tagsToRemove.map((tag) =>
          ServiceTransaction.removeTag(tag.id)
        );
        await Promise.all(removePromises);
      }
      fullTransaction = {
        ...fullTransaction,
        transaction_tags: [
          ...additional.currentTransactionTags.filter((tag) =>
            additional.transactionTags.includes(tag.id_tag)
          ),
          ...newTags
        ]
      };
    } catch {
      setIsUpdating(false);
      return false;
    }
    updateTransaction(fullTransaction);
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
  const loadTransactions = useCallback(
    async (idUser: string, filters: Partial<TypeTransactionsFilters>) => {
      if (filters.year == null) return;
      const { data, error } = await ServiceTransaction.findAll(
        idUser,
        filters.year,
        {
          idAccount: filters.idAccount ?? null,
          idTags: filters.idTags ?? []
        }
      );
      if (error || !data) return setRequestStatus(REQUEST_STATUS.error);
      setTransactions(data);
      setRequestStatus(REQUEST_STATUS.success);
    },
    [setRequestStatus, setTransactions]
  );
  useEffect(() => {
    if (
      !user ||
      filters.year == null ||
      requestStatus === REQUEST_STATUS.loading
    ) {
      return;
    }
    setRequestStatus(REQUEST_STATUS.loading);
    loadTransactions(user.id, filters);
  }, [filters]);
  return {
    transactions,
    requestStatus,
    isInserting,
    isUpdating,
    isDeleting,
    filters,
    create,
    update,
    remove
  };
};
