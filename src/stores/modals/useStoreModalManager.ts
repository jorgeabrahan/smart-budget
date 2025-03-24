import { MODAL_BASIC_ACTIONS, MANAGER_MODALS } from '@/lib/constants/modals';
import {
  TypeBudgetAccountsRegistry,
  TypeTransactionsRegistry
} from '@/lib/types/Tables';
import { create } from 'zustand';

interface Store {
  modal: keyof typeof MANAGER_MODALS | null;
  action: keyof typeof MODAL_BASIC_ACTIONS;
  data: TypeTransactionsRegistry | TypeBudgetAccountsRegistry | null;
  open: boolean;
  setOpen: (
    modal: keyof typeof MANAGER_MODALS,
    options?: {
      data?: TypeTransactionsRegistry | TypeBudgetAccountsRegistry | null;
      action?: keyof typeof MODAL_BASIC_ACTIONS;
    }
  ) => void;
  setClose: () => void;
}
const INITIAL_STATE = {
  modal: null,
  action: MODAL_BASIC_ACTIONS.create,
  data: null,
  open: false
};
export const useStoreModalManager = create<Store>((set) => ({
  ...INITIAL_STATE,
  setOpen: (modal, options) =>
    set(() => {
      const defaultActionBasedOnDataPresence =
        options?.data != null
          ? MODAL_BASIC_ACTIONS.edit
          : MODAL_BASIC_ACTIONS.create;
      return {
        modal,
        action: options?.action ?? defaultActionBasedOnDataPresence,
        data: options?.data ?? null,
        open: true
      };
    }),
  setClose: () =>
    set({
      modal: null,
      open: false
    })
}));
