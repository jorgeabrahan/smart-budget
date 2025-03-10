import { supabase } from '../config/supabase'
import { TypeRequestResponse } from '../lib/types/Request'
import { TypePlansRegistry } from '../lib/types/Tables'

export class ServicePlan {
  static async getAll(): Promise<TypeRequestResponse<TypePlansRegistry[]>> {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select(
          'id, name, description, monthly_price, duration_months, id_extends_plan, plan_benefits (id, description, id_plan)'
        )
      if (error) throw error
      return {
        data: data ?? [],
        error: null
      }
    } catch (error) {
      return {
        data: [],
        error
      }
    }
  }
}
