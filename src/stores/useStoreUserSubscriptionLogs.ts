import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeRequestStatus } from '@/lib/types/Request'
import { TypeSubscriptionLogsRegistry } from '@/lib/types/Tables'
import { create } from 'zustand'

interface Store {
  subscriptionLogs: {
    [page: string]: TypeSubscriptionLogsRegistry[]
  }
  pagination: {
    pages: number
    count: number
  }
  requestStatus: TypeRequestStatus
  setSubscriptionLogsPage: (
    page: number,
    subscriptionLogs: TypeSubscriptionLogsRegistry[],
    pagination: {
      pages: number
      count: number
    }
  ) => void
  setRequestStatus: (requestStatus: TypeRequestStatus) => void
}
const INITIAL_STATE = {
  subscriptionLogs: {},
  pagination: {
    pages: 0,
    count: 0
  },
  requestStatus: REQUEST_STATUS.notStarted
}
export const useStoreUserSubscriptionLogs = create<Store>((set) => ({
  subscriptionLogs: INITIAL_STATE.subscriptionLogs,
  pagination: INITIAL_STATE.pagination,
  requestStatus: INITIAL_STATE.requestStatus,
  setSubscriptionLogsPage: (page, subscriptionLogsPage, pagination) =>
    set((state) => ({
      subscriptionLogs: {
        ...state.subscriptionLogs,
        [`page_${page}`]: subscriptionLogsPage
      },
      requestStatus: REQUEST_STATUS.notStarted,
      pagination
    })),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    })
}))
