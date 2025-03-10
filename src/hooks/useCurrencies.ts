import { REQUEST_STATUS } from '@/lib/constants/requests'
import { ServiceCurrency } from '@/services/ServiceCurrency'
import { useStoreCurrencies } from '@/stores/useStoreCurrencies'
import { useEffect } from 'react'

export const useCurrencies = () => {
  const currencies = useStoreCurrencies((store) => store.currencies)
  const setCurrencies = useStoreCurrencies((store) => store.setCurrencies)
  const requestStatus = useStoreCurrencies((store) => store.requestStatus)
  const setRequestStatus = useStoreCurrencies((store) => store.setRequestStatus)
  useEffect(() => {
    const loadCurrencies = async () => {
      const { data, error } = await ServiceCurrency.getAll()
      if (error) return setRequestStatus(REQUEST_STATUS.error)
      setCurrencies(data)
    }
    if (
      currencies.length === 0 &&
      requestStatus === REQUEST_STATUS.notStarted
    ) {
      setRequestStatus(REQUEST_STATUS.loading)
      loadCurrencies()
    }
  }, [currencies, requestStatus, setRequestStatus, setCurrencies])

  return {
    currencies,
    requestStatus
  }
}
