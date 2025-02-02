import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { usePagination } from "../utils/pagination";

export const index = async (req: Request, res: Response) => {
  const searchKey = (req.query.searchKey as string) || "";

  const pages = await prisma.page.findMany({
    where: searchKey
      ? { title: { contains: searchKey, mode: "insensitive" }, deleted: false }
      : { deleted: false },
    orderBy: { id: "desc" },
  });
  const data = usePagination(10, pages, req);
  return res.status(200).json({ data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const page = await prisma.page.findFirst({
      where: { id, deleted: false },
    });
    if (!page)
      return res.status(400).json({ message: "The page can not be found!" });
    return res.status(200).json({ page });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const page = await prisma.page.create({
      data: { title, content },
    });

    return res.status(200).json({ page });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  try {
    const exist = await prisma.page.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The page can not be found!" });

    const page = await prisma.page.update({
      where: { id },
      data: { title, content },
    });

    return res.status(200).json({ page });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.page.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The page can not be found!" });

    await prisma.page.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
