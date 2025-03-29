import { supabase } from '@/config/supabase';
import { TypeRequestResponse } from '@/lib/types/Request';
import {
  TypeTransactionLoanDetailsRegistry,
  TypeTransactionsRegistry,
  TypeTransactionTagsRegistry
} from '@/lib/types/Tables';

export class ServiceTransaction {
  static async create(
    transaction: Omit<
      TypeTransactionsRegistry,
      'id' | 'created_at' | 'id_parent_transaction'
    >
  ): Promise<TypeRequestResponse<TypeTransactionsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert(transaction)
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
  static async updateLoanDetails(
    transactionLoanDetails: TypeTransactionLoanDetailsRegistry
  ) {
    try {
      const { data, error } = await supabase
        .from('transaction_loan_details')
        .update(transactionLoanDetails)
        .eq('id', transactionLoanDetails.id)
        .eq('id_transaction', transactionLoanDetails.id_transaction)
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
  static async createLoanDetails(
    transactionLoanDetails: Omit<TypeTransactionLoanDetailsRegistry, 'id'>
  ) {
    try {
      const { data, error } = await supabase
        .from('transaction_loan_details')
        .insert(transactionLoanDetails)
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
  static async removeTag(id: number) {
    try {
      const { error } = await supabase
        .from('transaction_tags')
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
  static async createTag(
    transactionTag: Omit<TypeTransactionTagsRegistry, 'id'>
  ) {
    try {
      const { data, error } = await supabase
        .from('transaction_tags')
        .insert(transactionTag)
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
    transaction: Omit<
      TypeTransactionsRegistry,
      'created_at' | 'id_parent_transaction'
    >
  ): Promise<TypeRequestResponse<TypeTransactionsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', transaction.id)
        .eq('id_user', transaction.id_user)
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
        .from('transactions')
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
    idUser: string,
    year: number,
    optionalFilters: {
      idAccount: number | null;
      idTags: number[];
    } = {
      idAccount: null,
      idTags: []
    }
  ): Promise<TypeRequestResponse<TypeTransactionsRegistry[]>> {
    try {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);

      let query = supabase
        .from('transactions')
        .select(
          'id, id_user, id_budget_account, name, description, amount, id_type, date, created_at, id_parent_transaction, transaction_tags (id, id_tag, id_transaction), transaction_loan_details (id, id_transaction, interest_rate, installments)'
        )
        .eq('id_user', idUser)
        .gte('date', startDate.toISOString())
        .lt('date', endDate.toISOString())
        .order('date', { ascending: false });

      if (optionalFilters.idAccount != null) {
        query = query.eq('id_budget_account', optionalFilters.idAccount);
      }
      if (optionalFilters.idTags && optionalFilters.idTags.length > 0) {
        query = query.in('transaction_tags.id_tag', optionalFilters.idTags);
      }

      const { data, error } = await query;

      if (error) throw error;

      const parsedData = data as unknown as TypeTransactionsRegistry[];
      return {
        data: parsedData ?? [],
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
