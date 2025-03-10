import { supabase } from '../config/supabase'
import {
  TypeRequestPagination,
  TypeRequestResponse
} from '../lib/types/Request'
import { TypeSubscriptionLogsRegistry } from '../lib/types/Tables'

export class ServiceSubscription {
  static async getManyByIdUser(
    idUser: string,
    pagination: TypeRequestPagination = {
      page: 1,
      limit: 10
    }
  ): Promise<TypeRequestResponse<TypeSubscriptionLogsRegistry[]>> {
    const offset = (pagination.page - 1) * pagination.limit
    try {
      const { count, error: errorA } = await supabase
        .from('subscription_logs')
        .select('id, id_user', { count: 'exact', head: true })
        .eq('id_user', idUser)
      if (errorA) throw errorA

      const { data, error } = await supabase
        .from('subscription_logs')
        .select('id, id_user, id_plan, start_date, end_date, plans (name)')
        .eq('id_user', idUser)
        .range(offset, offset + pagination.limit - 1)
      if (error) throw error

      const pages = count ? Math.ceil(count / pagination.limit) : 1
      return {
        data: (data as unknown as TypeSubscriptionLogsRegistry[]) ?? [],
        pagination: {
          pages,
          count: count ?? 0
        },
        error
      }
    } catch (error) {
      return {
        data: [],
        error
      }
    }
  }
}
