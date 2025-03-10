import { create } from 'zustand'
import { TypeSignedInUser } from '../lib/types/SignedInUser'
import { REQUEST_STATUS } from '../lib/constants/requests'
import { TypeRequestStatus } from '../lib/types/Request'

interface Store {
  user: TypeSignedInUser | null
  requestStatus: TypeRequestStatus
  setUser: (user: TypeSignedInUser | null) => void
  setRequestStatus: (requestStatus: TypeRequestStatus) => void
  reset: () => void
}
const INITIAL_STATE = {
  user: null,
  requestStatus: REQUEST_STATUS.notStarted
}
export const useStoreSignedInUser = create<Store>((set) => ({
  user: INITIAL_STATE.user,
  requestStatus: INITIAL_STATE.requestStatus,
  setUser: (user) =>
    set({
      user,
      requestStatus:
        user != null ? REQUEST_STATUS.success : REQUEST_STATUS.error
    }),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    }),
  reset: () =>
    set({
      user: INITIAL_STATE.user,
      requestStatus: INITIAL_STATE.requestStatus
    })
}))
