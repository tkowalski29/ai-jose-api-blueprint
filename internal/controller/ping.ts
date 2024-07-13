import type {Request, Response} from "express";

export const ping = () => async (req: Request, res: Response) => {
  res.send('pong');
  res.end();
};
