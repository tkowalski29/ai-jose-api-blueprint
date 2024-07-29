import type {Request, Response} from "express";

export const ping = () => async (req: Request, res: Response) => {
  res.status(200);
  res.json({"ping": "pong"});
  res.end();
};
