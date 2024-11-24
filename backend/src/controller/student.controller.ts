import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../utils/config";
import { usePagination } from "../../utils/pagination";
import { fileRemove } from "../../utils/fileUpload";

export const index = async (req: Request, res: Response) => {
  const searchKey = (req.query.searchKey as string) || "";

  const students = await prisma.student.findMany({
    where: searchKey
      ? { name: { contains: searchKey, mode: "insensitive" }, deleted: false }
      : { deleted: false },
    orderBy: { id: "desc" },
  });
  const data = usePagination(10, students, req);
  return res.status(200).json({ data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = await prisma.student.findFirst({
      where: { id, deleted: false },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        assetUrl: true,
        password: false,
      },
    });
    const purchase = await prisma.purchase.findMany({
      where: { studentId: data?.id, deleted: false },
      include: { student: true, lecture: true },
    });

    if (!data)
      return res.status(400).json({ message: "The student can not be found!" });
    const student = { ...data, Purchase: purchase };
    return res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { name, email, password, phone, assetUrl } = req.body;
  try {
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

    if (exist.assetUrl !== null && assetUrl !== exist.assetUrl) {
      fileRemove(exist.assetUrl);
    }

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
