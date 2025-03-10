import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeRequestStatus } from '@/lib/types/Request'
import { TypePlansRegistry } from '@/lib/types/Tables'
import { create } from 'zustand'

interface Store {
  plans: TypePlansRegistry[]
  requestStatus: TypeRequestStatus
  setPlans: (plans: TypePlansRegistry[]) => void
  setRequestStatus: (requestStatus: TypeRequestStatus) => void
  reset: () => void
}
const INITIAL_STATE = {
  plans: [],
  requestStatus: REQUEST_STATUS.notStarted
}
export const useStorePlans = create<Store>((set) => ({
  plans: INITIAL_STATE.plans,
  requestStatus: INITIAL_STATE.requestStatus,
  setPlans: (plans) =>
    set({
      plans,
      requestStatus: REQUEST_STATUS.success
    }),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    }),
  reset: () =>
    set({
      plans: INITIAL_STATE.plans,
      requestStatus: INITIAL_STATE.requestStatus
    })
}))
