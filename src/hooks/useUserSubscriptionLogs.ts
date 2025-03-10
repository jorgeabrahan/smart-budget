import { ServiceSubscription } from '@/services/ServiceSubscription'
import { useStoreUserSubscriptionLogs } from '@/stores/useStoreUserSubscriptionLogs'
import { useEffect, useState } from 'react'
import { useSignedIn } from './useSignedIn'
import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeSubscriptionLogsRegistry } from '@/lib/types/Tables'

export const useUserSubscriptionLogs = () => {
  const { user } = useSignedIn()
  const [page, setPage] = useState(1)
  const [subscriptions, setSubscriptions] = useState<
    TypeSubscriptionLogsRegistry[]
  >([])
  const subscriptionLogs = useStoreUserSubscriptionLogs(
    (store) => store.subscriptionLogs
  )
  const setSubscriptionLogsPage = useStoreUserSubscriptionLogs(
    (store) => store.setSubscriptionLogsPage
  )
  const pagination = useStoreUserSubscriptionLogs((store) => store.pagination)
  const requestStatus = useStoreUserSubscriptionLogs(
    (store) => store.requestStatus
  )
  const setRequestStatus = useStoreUserSubscriptionLogs(
    (store) => store.setRequestStatus
  )
  useEffect(() => {
    if (!user) return
    const loadUserSubscriptionLogs = async (idUser: string) => {
      const { data, pagination, error } =
        await ServiceSubscription.getManyByIdUser(idUser)
      if (error || !pagination) return setRequestStatus(REQUEST_STATUS.error)
      setSubscriptionLogsPage(page, data, pagination)
      setSubscriptions(data)
    }
    if (Array.isArray(subscriptionLogs[`page_${page}`])) {
      setSubscriptions(subscriptionLogs[`page_${page}`])
      return
    }
    if (requestStatus === REQUEST_STATUS.notStarted) {
      setRequestStatus(REQUEST_STATUS.loading)
      loadUserSubscriptionLogs(user.id)
    }
  }, [
    page,
    requestStatus,
    setRequestStatus,
    subscriptionLogs,
    setSubscriptionLogsPage,
    user
  ])

  return {
    subscriptions,
    pagination,
    setPage,
    requestStatus
  }
}
