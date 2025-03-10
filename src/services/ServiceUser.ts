import { AuthError } from '@supabase/supabase-js'
import { TypeRequestResponse } from '../lib/types/Request'
import { supabase } from '../config/supabase'
import { TypeSignedInUser } from '../lib/types/SignedInUser'

export class ServiceUser {
  static async getSignedIn(): Promise<
    TypeRequestResponse<TypeSignedInUser | null, AuthError>
  > {
    try {
      const {
        data: { user },
        error: errorUser
      } = await supabase.auth.getUser()
      if (errorUser || user == null) throw errorUser

      const { data: userDetails, error: errorUserDetails } = await supabase
        .from('user_details')
        .select('id, active, url_profile_picture, id_plan')
        .eq('id', user.id)
        .maybeSingle()
      if (errorUserDetails) throw errorUserDetails

      const userSignedIn =
        user && userDetails ? { ...user, ...userDetails } : null
      return {
        data: userSignedIn,
        error: errorUserDetails
      }
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  }
}
