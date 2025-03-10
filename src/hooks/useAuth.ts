import { useNavigate } from 'react-router'
import { supabase } from '../config/supabase'
import { FALLBACK_ERROR_MESSAGE } from '../lib/constants/errors'
import { ROUTES } from '../lib/constants/routes'
import { UtilsToast } from '../lib/utils/UtilsToast'
import { useStoreSignedInUser } from '../stores/useStoreSignedInUser'

export const useAuth = () => {
  const navigate = useNavigate()
  const resetSignedInUserStore = useStoreSignedInUser((store) => store.reset)
  const signIn = async (data: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(data)
      if (error) throw error.message
      resetSignedInUserStore()
      navigate(ROUTES.dashboard.absolutePath, { replace: true })
    } catch (error) {
      UtilsToast.error(
        typeof error === 'string' ? error : FALLBACK_ERROR_MESSAGE
      )
    }
  }
  const signUp = async (data: {
    email: string
    password: string
    displayName: string
  }) => {
    try {
      const resSignUp = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName
          }
        }
      })
      if (resSignUp.error) throw resSignUp.error.message
      const resUserDetailsInsert = await supabase.from('user_details').insert([
        {
          id: resSignUp.data.user?.id
        }
      ])
      if (resUserDetailsInsert.error) throw resUserDetailsInsert.error.message
      resetSignedInUserStore()
      navigate(ROUTES.dashboard.absolutePath, { replace: true })
    } catch (error) {
      UtilsToast.error(
        typeof error === 'string' ? error : FALLBACK_ERROR_MESSAGE
      )
    }
  }
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error.message
      resetSignedInUserStore()
      navigate(ROUTES.signIn.absolutePath, { replace: true })
    } catch (error) {
      UtilsToast.error(
        typeof error === 'string' ? error : FALLBACK_ERROR_MESSAGE
      )
    }
  }
  return {
    signIn,
    signUp,
    signOut
  }
}
