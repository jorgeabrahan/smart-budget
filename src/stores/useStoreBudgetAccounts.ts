import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeRequestStatus } from '@/lib/types/Request';
import { TypeBudgetAccountsRegistry } from '@/lib/types/Tables';
import { create } from 'zustand';

interface Store {
  budgetAccounts: TypeBudgetAccountsRegistry[];
  requestStatus: TypeRequestStatus;
  addBudgetAccount: (budgetAccount: TypeBudgetAccountsRegistry) => void;
  updateBudgetAccount: (budgetAccount: TypeBudgetAccountsRegistry) => void;
  removeBudgetAccount: (id: number) => void;
  setBudgetAccounts: (budgetAccounts: TypeBudgetAccountsRegistry[]) => void;
  setRequestStatus: (requestStatus: TypeRequestStatus) => void;
  reset: () => void;
}
const INITIAL_STATE = {
  budgetAccounts: [],
  requestStatus: REQUEST_STATUS.notStarted
};
export const useStoreBudgetAccounts = create<Store>((set) => ({
  budgetAccounts: INITIAL_STATE.budgetAccounts,
  requestStatus: INITIAL_STATE.requestStatus,
  addBudgetAccount: (budgetAccount) =>
    set((state) => ({
      budgetAccounts: [...state.budgetAccounts, budgetAccount]
    })),
  updateBudgetAccount: (budgetAccount) =>
    set((state) => ({
      budgetAccounts: state.budgetAccounts.map((account) =>
        account.id === budgetAccount.id ? budgetAccount : account
      )
    })),
  removeBudgetAccount: (id) =>
    set((state) => ({
      budgetAccounts: state.budgetAccounts.filter(
        (account) => account.id !== id
      )
    })),
  setBudgetAccounts: (budgetAccounts) => set({ budgetAccounts }),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    }),
  reset: () =>
    set({
      budgetAccounts: [],
      requestStatus: REQUEST_STATUS.notStarted
    })
}));
