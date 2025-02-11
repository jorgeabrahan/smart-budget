import { createClient } from '@/config/supabase/server'
import { UserDetailsRegistry } from '@/lib/types/UserDetailsRegistry'
import { AuthError, PostgrestError, User } from '@supabase/supabase-js'

export class ServiceUser {
  static async getSignedIn(): Promise<{
    data: { user: User | null; userDetails: UserDetailsRegistry | null }
    error: AuthError | PostgrestError | null
  }> {
    const supabase = await createClient()
    const {
      data: { user },
      error: errorUser
    } = await supabase.auth.getUser()
    const { data: userDetails, error: errorUserDetails } = await supabase
      .from('user_details')
      .select('*')
      .eq('id', user?.id)
      .maybeSingle()
    return {
      data: {
        user,
        userDetails
      },
      error: errorUser || errorUserDetails
    }
  }
}
