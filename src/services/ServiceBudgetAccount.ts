import { supabase } from '@/config/supabase'
import { TypeRequestResponse } from '@/lib/types/Request'
import { TypeAccountsRegistry } from '@/lib/types/Tables'

export class ServiceBudgetAccount {
  static async create(
    account: Omit<TypeAccountsRegistry, 'id'>
  ): Promise<TypeRequestResponse<TypeAccountsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert(account)
        .select()
        .maybeSingle()
      if (error) throw error
      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  }
  static async update(
    account: TypeAccountsRegistry
  ): Promise<TypeRequestResponse<TypeAccountsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(account)
        .eq('id', account.id)
        .eq('id_user', account.id_user)
        .select()
        .maybeSingle()
      if (error) throw error
      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error
      }
    }
  }
  static async delete() {}
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
