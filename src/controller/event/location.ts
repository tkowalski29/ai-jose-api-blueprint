import type { Request, Response} from "express";

export const eventLocation = () => async (req: Request, res: Response) => {
  res.status(200);
  res.json(null);
  res.end();
};
