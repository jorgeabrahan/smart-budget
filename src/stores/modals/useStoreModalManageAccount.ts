import { MODAL_BASIC_ACTIONS } from '@/lib/constants/modals'
import { TypeAccountsRegistry } from '@/lib/types/Tables'
import { create } from 'zustand'

interface Store {
  action: keyof typeof MODAL_BASIC_ACTIONS
  account: TypeAccountsRegistry | null
  open: boolean
  setOpen: (
    action?: keyof typeof MODAL_BASIC_ACTIONS,
    account?: TypeAccountsRegistry | null
  ) => void
  setClose: () => void
}
const INITIAL_STATE = {
  action: MODAL_BASIC_ACTIONS.create,
  account: null,
  open: false
}
export const useStoreModalManageAccount = create<Store>((set) => ({
  action: INITIAL_STATE.action,
  account: INITIAL_STATE.account,
  open: INITIAL_STATE.open,
  setOpen: (action = INITIAL_STATE.action, account = INITIAL_STATE.account) =>
    set({
      action,
      account,
      open: true
    }),
  setClose: () =>
    set({
      open: false
    })
}))
