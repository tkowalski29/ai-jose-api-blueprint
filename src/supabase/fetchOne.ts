import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ITalkAssistant, ITalkConversation, ITalkLlm } from '../ai/type';

export const fetchOneConversation = async (id: string): Promise<ITalkConversation> => {
  const supabase: SupabaseClient = createClient(process.env.JOSE_API_SUPABASE_URL, process.env.JOSE_API_SUPABASE_KEY);

  const { data, error } = await supabase
  .from("conversation")
  .select('*')
  .eq("conversationId", id)
  .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0]
}

export const fetchOneAssistant = async (id: string): Promise<ITalkAssistant> => {
  const supabase: SupabaseClient = createClient(process.env.JOSE_API_SUPABASE_URL, process.env.JOSE_API_SUPABASE_KEY);

  const { data, error } = await supabase
  .from("assistant")
  .select('*')
  .eq("assistantId", id)
  .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0]
}

export const fetchOneLlm = async (key: string): Promise<ITalkLlm> => {
  const supabase: SupabaseClient = createClient(process.env.JOSE_API_SUPABASE_URL, process.env.JOSE_API_SUPABASE_KEY);

  const { data, error } = await supabase
  .from("llm")
  .select('*')
  .eq("key", key)
  .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0]
}