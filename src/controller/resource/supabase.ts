import type { Request, Response} from "express";
import { fetchAll } from "../../supabase/fetchAll";

export const resourceSupabase = () => async (req: Request, res: Response) => {
  try {
    const data = await fetchAll(req.query.table as string)

    res.status(200);
    res.json(data);
    res.end();
  } catch (err) {
    res.status(500);
    res.json(err);
    res.end();
    console.error('Unexpected error:', err);
  }
};
