import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeRequestStatus } from '@/lib/types/Request'
import { TypeTransactionTypesRegistry } from '@/lib/types/Tables'
import { create } from 'zustand'

interface Store {
  transactionTypes: TypeTransactionTypesRegistry[]
  requestStatus: TypeRequestStatus
  setTransactionTypes: (
    transactionTypes: TypeTransactionTypesRegistry[]
  ) => void
  setRequestStatus: (requestStatus: TypeRequestStatus) => void
}
const INITIAL_STATE = {
  transactionTypes: [],
  requestStatus: REQUEST_STATUS.notStarted
}
export const useStoreTransactionTypes = create<Store>((set) => ({
  ...INITIAL_STATE,
  setTransactionTypes: (transactionTypes) =>
    set({
      transactionTypes,
      requestStatus: REQUEST_STATUS.success
    }),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    })
}))
