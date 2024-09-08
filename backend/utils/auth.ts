import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";

export const checkauth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers;
  const authorization = header.authorization;

  if (!authorization) return res.status(401).json({ message: "unauthorize!" });
  try {
    const accessToken = authorization.split("")[1];
    const validate = jwt.verify(accessToken, config.jwtSecret);
    if (!validate) return res.status(401).json({ message: "unauthorize!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
