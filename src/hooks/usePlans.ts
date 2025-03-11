import { REQUEST_STATUS } from '@/lib/constants/requests'
import { ServicePlan } from '@/services/ServicePlan'
import { useStorePlans } from '@/stores/useStorePlans'
import { useEffect } from 'react'

export const usePlans = () => {
  const plans = useStorePlans((store) => store.plans)
  const setPlans = useStorePlans((store) => store.setPlans)
  const requestStatus = useStorePlans((store) => store.requestStatus)
  const setRequestStatus = useStorePlans((store) => store.setRequestStatus)
  useEffect(() => {
    const loadPlans = async () => {
      const { data, error } = await ServicePlan.getAll()
      if (error) return setRequestStatus(REQUEST_STATUS.error)
      setPlans(data)
    }
    if (plans.length === 0 && requestStatus === REQUEST_STATUS.notStarted) {
      setRequestStatus(REQUEST_STATUS.loading)
      loadPlans()
    }
  }, [plans, requestStatus, setRequestStatus, setPlans])

  return {
    plans,
    requestStatus
  }
}
