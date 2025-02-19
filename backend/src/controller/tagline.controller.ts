import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { usePagination } from "../utils/pagination";

export const index = async (req: Request, res: Response) => {
  const searchKey = (req.query.searchKey as string) || "";
  const taglines = await prisma.tagLine.findMany({
    where: searchKey
      ? { deleted: false, title: { contains: searchKey, mode: "insensitive" } }
      : { deleted: false },
    orderBy: { id: "desc" },
  });
  const data = usePagination(10, taglines, req);

  return res.status(200).json({ ...data, query: req.query });
};

export const store = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const tagLine = await prisma.tagLine.create({
      data: { title, description },
    });

    return res.status(200).json({ tagLine });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const tagLine = await prisma.tagLine.findFirst({
      where: { id, deleted: false },
    });
    if (!tagLine)
      return res.status(400).json({ message: "This tagLine can not be found" });

    return res.status(200).json({ tagLine });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  try {
    const exist = await prisma.tagLine.findFirst({ where: { id } });
    if (!exist)
      return res.status(400).json({ message: "This tagLine can not be found" });

    const tagLine = await prisma.tagLine.update({
      where: { id },
      data: { title, description },
    });

    return res.status(200).json({ tagLine });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.tagLine.findFirst({ where: { id } });
    if (!exist)
      return res.status(400).json({ message: "This tagLine can not be found" });
    await prisma.lectureonCategory.deleteMany({ where: { categoryId: id } });

    await prisma.tagLine.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
