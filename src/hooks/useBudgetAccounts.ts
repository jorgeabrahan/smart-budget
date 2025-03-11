import { ServiceBudgetAccount } from '@/services/ServiceBudgetAccount'
import { useStoreBudgetAccounts } from '@/stores/useStoreBudgetAccounts'
import { useEffect, useState } from 'react'
import { useSignedIn } from './useSignedIn'
import { REQUEST_STATUS } from '@/lib/constants/requests'
import { TypeAccountsRegistry } from '@/lib/types/Tables'

export const useBudgetAccounts = () => {
  const { user } = useSignedIn()
  const budgetAccounts = useStoreBudgetAccounts((store) => store.budgetAccounts)
  const setBudgetAccounts = useStoreBudgetAccounts(
    (store) => store.setBudgetAccounts
  )
  const addBudgetAccount = useStoreBudgetAccounts(
    (store) => store.addBudgetAccount
  )
  const updateBudgetAccount = useStoreBudgetAccounts(
    (store) => store.updateBudgetAccount
  )
  const requestStatus = useStoreBudgetAccounts((store) => store.requestStatus)
  const setRequestStatus = useStoreBudgetAccounts(
    (store) => store.setRequestStatus
  )
  const [isInserting, setIsInserting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const create = async (
    budgetAccount: Omit<TypeAccountsRegistry, 'id' | 'id_user'>
  ): Promise<boolean> => {
    if (!user) return false
    setIsInserting(true)
    const { data, error } = await ServiceBudgetAccount.create({
      ...budgetAccount,
      id_user: user.id
    })
    if (!data || error) {
      setIsInserting(false)
      return false
    }
    addBudgetAccount(data)
    setIsInserting(false)
    return true
  }
  const update = async (
    budgetAccount: Omit<TypeAccountsRegistry, 'id' | 'id_user'>
  ): Promise<boolean> => {
    if (!user) return false
    setIsUpdating(true)
    const { data, error } = await ServiceBudgetAccount.update(budgetAccount)
    if (!data || error) {
      setIsUpdating(false)
      return false
    }
    updateBudgetAccount(data)
    setIsUpdating(false)
    return true
  }
  useEffect(() => {
    if (!user) return
    const loadBudgetAccounts = async () => {
      const { data, error } = await ServiceBudgetAccount.getAll(user.id)
      if (error) return setRequestStatus(REQUEST_STATUS.error)
      setBudgetAccounts(data)
    }
    if (
      budgetAccounts.length === 0 &&
      requestStatus === REQUEST_STATUS.notStarted
    ) {
      setRequestStatus(REQUEST_STATUS.loading)
      loadBudgetAccounts()
    }
  }, [budgetAccounts, setBudgetAccounts, requestStatus, setRequestStatus, user])

  return {
    budgetAccounts,
    requestStatus,
    isInserting,
    isUpdating,
    create,
    update
  }
}
