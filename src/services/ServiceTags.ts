import { supabase } from '@/config/supabase';
import { TypeRequestResponse } from '@/lib/types/Request';
import { TypeTagsRegistry } from '@/lib/types/Tables';

export class ServiceTags {
  static async create(
    tag: Omit<TypeTagsRegistry, 'id'>
  ): Promise<TypeRequestResponse<TypeTagsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert(tag)
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
    tag: Omit<TypeTagsRegistry, 'created_at'>
  ): Promise<TypeRequestResponse<TypeTagsRegistry | null>> {
    try {
      const { data, error } = await supabase
        .from('tags')
        .update(tag)
        .eq('id', tag.id)
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
      const { error } = await supabase.from('tags').delete().eq('id', id);
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
  ): Promise<TypeRequestResponse<TypeTagsRegistry[]>> {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('id, id_user, name, color')
        .eq('id_user', idUser);
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
