import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  console.log("hello");

  return res.send("hello");
};
