import { Request, Response } from "express";
import { prisma } from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

export const index = (req: Request, res: Response) => {
  console.log("hello");

  return res.send("hello");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const isvalid = email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required" });
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ message: "There is no user with this email" });

    const passwordValidate = await bcrypt.compare(password, user.password);
    if (!passwordValidate)
      return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign(user, config.jwtSecret);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
