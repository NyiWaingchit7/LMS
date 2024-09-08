import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";

export const index = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ where: { deleted: false } });
  return res.status(200).json({ users });
};

export const store = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const isValid = username && email && password;
    if (!isValid)
      return res.status(400).json({ message: "All fields are required" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashPassword },
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findFirst({ where: { id, deleted: false } });
    if (!user)
      return res.status(404).json({ message: "This user can not be found!" });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { username, email, password } = req.body;
  try {
    const isValid = username && email;
    if (!isValid)
      return res.status(400).json({ message: "All fields are required" });

    const exist = await prisma.user.findFirst({ where: { id } });
    if (!exist)
      return res.status(404).json({ message: "This user can not be found!" });

    const user = await prisma.user.update({
      where: { id },
      data: { username, email },
    });
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id },
        data: { password: hashPassword },
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const exist = await prisma.user.findFirst({ where: { id } });
    if (!exist)
      return res.status(404).json({ message: "This user can not be found!" });

    await prisma.user.update({ where: { id }, data: { deleted: true } });

    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
