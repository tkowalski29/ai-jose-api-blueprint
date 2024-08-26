import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IAssistant } from '../ai/data/assistant';
import { IConversation } from '../ai/data/conversation';
import { ILlm } from '../ai/data/llm';

export const fetchOneConversation = async (id: string): Promise<IConversation> => {
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

export const fetchOneAssistant = async (id: string): Promise<IAssistant> => {
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

export const fetchOneLlm = async (key: string): Promise<ILlm> => {
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