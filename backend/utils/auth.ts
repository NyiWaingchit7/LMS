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
export const usercheckauth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = getUserFromToken(req, res);
    if (!validate) return res.status(401).json({ message: "unauthorize!" });
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getUserFromToken = (req: Request, res: Response) => {
  try {
    const header = req.headers;
    const authorization = header.authorization;
    if (!authorization)
      return res.status(401).json({ message: "unauthorize!" });
    const accessToken = authorization.split(" ")[1];
    const validate = jwt.verify(accessToken, config.jwtStudentSecret);

    if (!validate) {
      return res.status(401).json({ message: "unauthorize!" });
    } else {
      return validate;
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const verifyApiToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers;
  const authorization = header.api_token as any;
  if (!authorization)
    return res.status(401).json({ message: "Invalid or expired token!" });

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.apiSecret) as any;

    if (decoded?.app !== config.apiId) {
      return res.status(403).json({ error: "Forbidden: Invalid app" });
    }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
