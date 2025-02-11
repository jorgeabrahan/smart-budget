import { createClient } from '@/config/supabase/client'
import { UtilsToast } from '@/lib/utils/UtilsToast'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
  const supabase = createClient()
  const signIn = async (data: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(data)
      if (error) {
        UtilsToast.error(error.message)
        return
      }
      router.replace('/')
    } catch {
      UtilsToast.error('An unexpected error occurred')
    }
  }
  const signUp = async (data: {
    email: string
    password: string
    displayName: string
  }) => {
    try {
      const res = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName
          }
        }
      })
      if (res.error) {
        UtilsToast.error(res.error.message)
        return
      }
      const { error } = await supabase.from('user_details').insert([
        {
          id: res.data.user?.id
        }
      ])
      if (error) {
        UtilsToast.error(error.message)
        return
      }
      router.replace('/')
    } catch {
      UtilsToast.error('An unexpected error occurred')
    }
  }
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        UtilsToast.error(error.message)
        return
      }
      router.replace('/sign-in')
    } catch {
      UtilsToast.error('An unexpected error occurred')
    }
  }
  return {
    signIn,
    signUp,
    signOut
  }
}
