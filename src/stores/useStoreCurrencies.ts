import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeRequestStatus } from '@/lib/types/Request'
import { TypeCurrenciesRegistry } from '@/lib/types/Tables'
import { create } from 'zustand'

interface Store {
  currencies: TypeCurrenciesRegistry[]
  requestStatus: TypeRequestStatus
  setCurrencies: (currencies: TypeCurrenciesRegistry[]) => void
  setRequestStatus: (requestStatus: TypeRequestStatus) => void
}
const INITIAL_STATE = {
  currencies: [],
  requestStatus: REQUEST_STATUS.notStarted
}
export const useStoreCurrencies = create<Store>((set) => ({
  currencies: INITIAL_STATE.currencies,
  requestStatus: INITIAL_STATE.requestStatus,
  setCurrencies: (currencies: TypeCurrenciesRegistry[]) =>
    set({
      currencies,
      requestStatus: REQUEST_STATUS.success
    }),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    })
}))
