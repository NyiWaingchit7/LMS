import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../utils/db";
import jwt from "jsonwebtoken";
import { config } from "../../../utils/config";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, assetUrl } = req.body;
  try {
    const isvalid = name && email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });
    const hasPassword = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: { name, email, password: hasPassword, phone, assetUrl },
    });

    const token = jwt.sign(student, config.jwtStudentSecret);

    return res.status(200).json({ student, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const isvalid = email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required" });
    const student = await prisma.student.findFirst({ where: { email } });
    if (!student)
      return res
        .status(404)
        .json({ message: "There is no user with this email" });

    const passwordValidate = await bcrypt.compare(password, student.password);
    if (!passwordValidate)
      return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign(student, config.jwtStudentSecret);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
