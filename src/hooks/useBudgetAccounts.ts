import { ServiceBudgetAccount } from '@/services/ServiceBudgetAccount';
import { useStoreBudgetAccounts } from '@/stores/useStoreBudgetAccounts';
import { useEffect, useState } from 'react';
import { useSignedIn } from './useSignedIn';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeBudgetAccountsRegistry } from '@/lib/types/Tables';

export const useBudgetAccounts = () => {
  const { user } = useSignedIn();
  const budgetAccounts = useStoreBudgetAccounts(
    (store) => store.budgetAccounts
  );
  const setBudgetAccounts = useStoreBudgetAccounts(
    (store) => store.setBudgetAccounts
  );
  const addBudgetAccount = useStoreBudgetAccounts(
    (store) => store.addBudgetAccount
  );
  const updateBudgetAccount = useStoreBudgetAccounts(
    (store) => store.updateBudgetAccount
  );
  const removeBudgetAccount = useStoreBudgetAccounts(
    (store) => store.removeBudgetAccount
  );
  const requestStatus = useStoreBudgetAccounts((store) => store.requestStatus);
  const setRequestStatus = useStoreBudgetAccounts(
    (store) => store.setRequestStatus
  );
  const [isInserting, setIsInserting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const create = async (
    budgetAccount: Omit<
      TypeBudgetAccountsRegistry,
      'id' | 'id_user' | 'created_at'
    >
  ): Promise<boolean> => {
    if (!user) return false;
    setIsInserting(true);
    const { data, error } = await ServiceBudgetAccount.create({
      ...budgetAccount,
      id_user: user.id
    });
    if (!data || error) {
      setIsInserting(false);
      return false;
    }
    addBudgetAccount(data);
    setIsInserting(false);
    return true;
  };
  const update = async (
    budgetAccount: Omit<TypeBudgetAccountsRegistry, 'created_at'>
  ): Promise<boolean> => {
    if (!user) return false;
    setIsUpdating(true);
    const { data, error } = await ServiceBudgetAccount.update(budgetAccount);
    if (!data || error) {
      setIsUpdating(false);
      return false;
    }
    updateBudgetAccount(data);
    setIsUpdating(false);
    return true;
  };
  const remove = async (id: number) => {
    if (!user) return false;
    setIsDeleting(true);
    const { data, error } = await ServiceBudgetAccount.remove(id);
    if (error || data === false) {
      setIsDeleting(false);
      return false;
    }
    removeBudgetAccount(id);
    setIsDeleting(false);
    return true;
  };
  useEffect(() => {
    if (!user) return;
    const loadBudgetAccounts = async () => {
      const { data, error } = await ServiceBudgetAccount.findAll(user.id);
      if (error) return setRequestStatus(REQUEST_STATUS.error);
      setBudgetAccounts(data);
      setRequestStatus(REQUEST_STATUS.success);
    };
    if (
      budgetAccounts.length === 0 &&
      requestStatus === REQUEST_STATUS.notStarted
    ) {
      setRequestStatus(REQUEST_STATUS.loading);
      loadBudgetAccounts();
    }
  }, [
    budgetAccounts,
    setBudgetAccounts,
    requestStatus,
    setRequestStatus,
    user
  ]);

  return {
    budgetAccounts,
    requestStatus,
    isInserting,
    isUpdating,
    isDeleting,
    create,
    update,
    remove
  };
};
