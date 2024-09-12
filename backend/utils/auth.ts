import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";

export const checkauth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers;
    const authorization = header.authorization;
    if (!authorization)
      return res.status(401).json({ message: "unauthorize!" });
    const accessToken = authorization.split(" ")[1];
    const validate = jwt.verify(accessToken, config.jwtSecret);

    if (!validate) return res.status(401).json({ message: "unauthorize!" });
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
