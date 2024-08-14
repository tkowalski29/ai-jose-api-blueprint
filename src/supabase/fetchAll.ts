import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ITalkMessage } from '../ai/type';

export const fetchAll = async (tableName: string): Promise<any> => {
  const supabase: SupabaseClient = createClient(process.env.JOSE_API_SUPABASE_URL, process.env.JOSE_API_SUPABASE_KEY);

  const { data, error } = await supabase
  .from(tableName)
  .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data
}

export const fetchAllMessage = async (conversationId: string): Promise<ITalkMessage[]> => {
  const supabase: SupabaseClient = createClient(process.env.JOSE_API_SUPABASE_URL, process.env.JOSE_API_SUPABASE_KEY);

  const { data, error } = await supabase
  .from("message")
  .select('*')
  .eq("conversation", conversationId);

  if (error) {
    throw new Error(error.message);
  }

  return data
}
