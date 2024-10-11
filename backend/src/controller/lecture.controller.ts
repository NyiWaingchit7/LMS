import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { usePagination } from "../../utils/pagination";

export const index = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const lectureData = await prisma.lecture.findMany({
    where: { deleted: false },
    orderBy: { id: "desc" },
    include: {
      LectureonCategory: { include: { category: true } },
      Lesson: { where: { deleted: false } },
    },
  });
  const lectures = lectureData.map((lecture) => ({
    ...lecture,
    categories: lecture.LectureonCategory.map((lc) => lc.category),
  }));
  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
  const data = usePagination(page, 10, lectures, baseUrl);
  return res.status(200).json({ data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = await prisma.lecture.findFirst({
      where: { id, deleted: false },

      include: {
        LectureonCategory: { include: { category: true } },
        Lesson: { where: { deleted: false } },
      },
    });
    if (!data)
      return res.status(400).json({ message: "The lecture can not be found!" });
    const lecture = {
      ...data,
      categories: data.LectureonCategory.map((lc) => lc.category),
    };
    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, description, isPremium, categories, price, discount_price } =
    req.body;
  try {
    const lecture = await prisma.lecture.create({
      data: { title, description, isPremium, price, discount_price },
    });

    const data = await prisma.$transaction(
      categories.map((d: number) =>
        prisma.lectureonCategory.create({
          data: { lectureId: lecture.id, categoryId: d },
        })
      )
    );

    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, isPremium, categories, price, discount_price } =
    req.body;
  try {
    const exist = await prisma.lecture.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lecture can not be found!" });

    const lecture = await prisma.lecture.update({
      where: { id },
      data: {
        title,
        description,
        isPremium,
        price,
        discount_price: discount_price ?? 0,
      },
    });

    await prisma.lectureonCategory.deleteMany({ where: { lectureId: id } });

    const data = await prisma.$transaction(
      categories.map((d: number) =>
        prisma.lectureonCategory.create({
          data: { lectureId: lecture.id, categoryId: d },
        })
      )
    );

    return res.status(200).json({ lecture, data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.lecture.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lecture can not be found!" });
    await prisma.lectureonCategory.deleteMany({ where: { lectureId: id } });
    await prisma.lecture.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
