import type { Request, Response} from "express";

export const mobileEvent = () => async (req: Request, res: Response) => {
  res.status(200);
  res.json(req);
  res.end();
};
