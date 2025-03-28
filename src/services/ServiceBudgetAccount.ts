import { supabase } from '@/config/supabase';
import { TypeRequestResponse } from '@/lib/types/Request';
import { TypeBudgetAccountsRegistry } from '@/lib/types/Tables';

export class ServiceBudgetAccount {
  static async create(
    account: Omit<TypeBudgetAccountsRegistry, 'id' | 'created_at'>
  ): Promise<TypeRequestResponse<TypeBudgetAccountsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('budget_accounts')
        .insert(account)
        .select()
        .maybeSingle();
      if (error) throw error;
      return {
        data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      };
    }
  }
  static async update(
    account: Omit<TypeBudgetAccountsRegistry, 'created_at'>
  ): Promise<TypeRequestResponse<TypeBudgetAccountsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('budget_accounts')
        .update(account)
        .eq('id', account.id)
        .eq('id_user', account.id_user)
        .select()
        .maybeSingle();
      if (error) throw error;
      return {
        data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      };
    }
  }
  static async remove(id: number): Promise<TypeRequestResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('budget_accounts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return {
        data: true,
        error: null
      };
    } catch (error) {
      return {
        data: false,
        error
      };
    }
  }
  static async findAll(
    idUser: string
  ): Promise<TypeRequestResponse<TypeBudgetAccountsRegistry[]>> {
    try {
      const { data, error } = await supabase
        .from('budget_accounts')
        .select(
          'id, id_user, name, description, color, id_currency, created_at'
        )
        .eq('id_user', idUser)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return {
        data: data ?? [],
        error
      };
    } catch (error) {
      return {
        data: [],
        error
      };
    }
  }
}
