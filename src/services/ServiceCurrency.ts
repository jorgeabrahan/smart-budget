import { supabase } from '@/config/supabase'
import { TypeRequestResponse } from '@/lib/types/Request'
import { TypeCurrenciesRegistry } from '@/lib/types/Tables'

export class ServiceCurrency {
  static async getAll(): Promise<
    TypeRequestResponse<TypeCurrenciesRegistry[]>
  > {
    try {
      const { data, error } = await supabase
        .from('currencies')
        .select('id, iso_code, currency')
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
