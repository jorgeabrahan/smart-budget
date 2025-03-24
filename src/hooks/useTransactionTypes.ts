import { REQUEST_STATUS } from '@/lib/constants/requests'
import { ServiceTransactionType } from '@/services/ServiceTransactionType'
import { useStoreTransactionTypes } from '@/stores/useStoreTransactionTypes'
import { useEffect } from 'react'

export const useTransactionTypes = () => {
  const transactionTypes = useStoreTransactionTypes(
    (store) => store.transactionTypes
  )
  const setTransactionTypes = useStoreTransactionTypes(
    (store) => store.setTransactionTypes
  )
  const requestStatus = useStoreTransactionTypes((store) => store.requestStatus)
  const setRequestStatus = useStoreTransactionTypes(
    (store) => store.setRequestStatus
  )
  useEffect(() => {
    if (requestStatus === REQUEST_STATUS.loading) return
    const loadTransactionTypes = async () => {
      const { data, error } = await ServiceTransactionType.getAll()
      if (error) return setRequestStatus(REQUEST_STATUS.error)
      setTransactionTypes(data)
    }
    if (
      transactionTypes.length === 0 &&
      requestStatus === REQUEST_STATUS.notStarted
    ) {
      setRequestStatus(REQUEST_STATUS.loading)
      loadTransactionTypes()
    }
  }, [transactionTypes, setTransactionTypes, requestStatus, setRequestStatus])

  return {
    transactionTypes,
    requestStatus
  }
}
