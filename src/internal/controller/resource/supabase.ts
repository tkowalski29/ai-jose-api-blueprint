import type { Request, Response} from "express";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const resourceSupabase = () => async (req: Request, res: Response) => {
  const supabase: SupabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  try {
    const { data, error } = await supabase
      .from(req.query.table as string)
      .select('*');

    if (error) {
      res.status(500);
      res.json(error);
      console.error('Error fetching data:', error);
    } else {
      res.status(200);
      res.json(data);
    }
    res.end();
  } catch (err) {
    res.status(500);
    res.json(err);
    res.end();
    console.error('Unexpected error:', err);
  }
};
