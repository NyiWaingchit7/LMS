import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { usePagination } from "../../utils/pagination";

export const index = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;

  const categories = await prisma.category.findMany({
    where: { deleted: false },
    orderBy: { id: "desc" },
    include: { LectureonCategory: { include: { lecture: true } } },
  });
  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
  const data = usePagination(page, 10, categories, baseUrl);

  return res.status(200).json({ data });
};

export const store = async (req: Request, res: Response) => {
  const { name, assetUrl } = req.body;

  try {
    const category = await prisma.category.create({
      data: { name, assetUrl },
      include: { LectureonCategory: { include: { lecture: true } } },
    });

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const category = await prisma.category.findFirst({
      where: { id, deleted: false },
      include: { LectureonCategory: { include: { lecture: true } } },
    });
    if (!category)
      return res
        .status(400)
        .json({ message: "This category can not be found" });

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, assetUrl, userId } = req.body;
  try {
    const exist = await prisma.category.findFirst({ where: { id } });
    if (!exist)
      return res
        .status(400)
        .json({ message: "This category can not be found" });
    const category = await prisma.category.update({
      where: { id },
      data: { name, assetUrl },
      include: { LectureonCategory: { include: { lecture: true } } },
    });

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.category.findFirst({ where: { id } });
    if (!exist)
      return res
        .status(400)
        .json({ message: "This category can not be found" });
    await prisma.lectureonCategory.deleteMany({ where: { categoryId: id } });

    await prisma.category.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
