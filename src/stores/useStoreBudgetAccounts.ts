import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeRequestStatus } from '@/lib/types/Request'
import { TypeAccountsRegistry } from '@/lib/types/Tables'
import { create } from 'zustand'

interface Store {
  budgetAccounts: TypeAccountsRegistry[]
  requestStatus: TypeRequestStatus
  addBudgetAccount: (budgetAccount: TypeAccountsRegistry) => void
  updateBudgetAccount: (budgetAccount: TypeAccountsRegistry) => void
  setBudgetAccounts: (budgetAccounts: TypeAccountsRegistry[]) => void
  setRequestStatus: (requestStatus: TypeRequestStatus) => void
}
const INITIAL_STATE = {
  budgetAccounts: [],
  requestStatus: REQUEST_STATUS.notStarted
}
export const useStoreBudgetAccounts = create<Store>((set) => ({
  budgetAccounts: INITIAL_STATE.budgetAccounts,
  requestStatus: INITIAL_STATE.requestStatus,
  addBudgetAccount: (budgetAccount) =>
    set((state) => ({
      budgetAccounts: [budgetAccount, ...state.budgetAccounts]
    })),
  updateBudgetAccount: (budgetAccount) =>
    set((state) => ({
      budgetAccounts: state.budgetAccounts.map((account) =>
        account.id === budgetAccount.id ? budgetAccount : account
      )
    })),
  setBudgetAccounts: (budgetAccounts) => set({ budgetAccounts }),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    })
}))
