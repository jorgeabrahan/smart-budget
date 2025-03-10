import { supabase } from '@/config/supabase'
import { TypeRequestResponse } from '@/lib/types/Request'
import { TypeAccountsRegistry } from '@/lib/types/Tables'

export class ServiceBudgetAccount {
  static async create(account: TypeAccountsRegistry) {
    try {
      const { error } = await supabase.from('accounts').insert(account)
      if (error) throw error
      return {
        isSuccess: true,
        error: null
      }
    } catch (error) {
      return {
        isSuccess: false,
        error
      }
    }
  }
  static async getAll(
    idUser: string
  ): Promise<TypeRequestResponse<TypeAccountsRegistry[]>> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select(
          'id, id_user, name, description, color, id_currency, currencies (id, iso_code, currency)'
        )
        .eq('id_user', idUser)
      if (error) throw error
      return {
        data: data ?? [],
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
