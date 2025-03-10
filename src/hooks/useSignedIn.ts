import { useEffect } from 'react'
import { ServiceUser } from '../services/ServiceUser'
import { useStoreSignedInUser } from '../stores/useStoreSignedInUser'
import { REQUEST_STATUS } from '../lib/constants/requests'

export const useSignedIn = () => {
  const user = useStoreSignedInUser((store) => store.user)
  const requestStatus = useStoreSignedInUser((store) => store.requestStatus)
  const setUser = useStoreSignedInUser((store) => store.setUser)
  const setRequestStatus = useStoreSignedInUser(
    (store) => store.setRequestStatus
  )
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await ServiceUser.getSignedIn()
      if (error) return setUser(null)
      setUser(data)
    }
    if (user == null && requestStatus === REQUEST_STATUS.notStarted) {
      setRequestStatus(REQUEST_STATUS.loading)
      loadUser()
    }
  }, [user, requestStatus, setRequestStatus, setUser])

  return {
    user,
    requestStatus
  }
}
