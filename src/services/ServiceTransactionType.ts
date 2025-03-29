import { supabase } from '@/config/supabase';
import { TypeRequestResponse } from '@/lib/types/Request';
import { TypeTransactionTypesRegistry } from '@/lib/types/Tables';

export class ServiceTransactionType {
  static async getAll(): Promise<
    TypeRequestResponse<TypeTransactionTypesRegistry[]>
  > {
    try {
      const { data, error } = await supabase
        .from('transaction_types')
        .select('id, name, description, operation, color');
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
