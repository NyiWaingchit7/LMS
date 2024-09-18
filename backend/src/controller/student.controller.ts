import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../utils/config";

export const index = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany({ where: { deleted: false } });
  return res.status(200).json({ students });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const student = await prisma.student.findFirst({
      where: { id, deleted: false },
    });
    if (!student)
      return res.status(400).json({ message: "The student can not be found!" });
    return res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { name, email, password, phone, assetUrl } = req.body;
  try {
    const isvalid = name && email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });
    const hasPassword = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: { name, email, password: hasPassword, phone, assetUrl },
    });

    return res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, password, phone, assetUrl } = req.body;
  try {
    const exist = await prisma.student.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The student can not be found!" });

    const isvalid = name && email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });

    const hasPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.update({
      where: { id },
      data: { name, email, password: hasPassword, phone, assetUrl },
    });

    return res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.student.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The student can not be found!" });

    await prisma.student.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

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