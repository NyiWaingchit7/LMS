import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const index = async (req: Request, res: Response) => {
  const lectures = await prisma.lecture.findMany({
    where: { deleted: false },
    include: {
      LectureonCategory: { include: { category: true } },
      Lesson: { where: { deleted: false } },
    },
  });
  return res.status(200).json({ lectures });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const lecture = await prisma.lecture.findFirst({
      where: { id, deleted: false },
      include: {
        LectureonCategory: { include: { category: true } },
        Lesson: { where: { deleted: false } },
      },
    });
    if (!lecture)
      return res.status(400).json({ message: "The lecture can not be found!" });
    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, description, isPremium, categories, price, discount_price } =
    req.body;
  try {
    const isvalid = title && description && price && categories.length >= 1;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });

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

    const isvalid = title && description && price && categories.length >= 1;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });

    const lecture = await prisma.lecture.update({
      where: { id },
      data: { title, description, isPremium, price, discount_price },
      include: {
        LectureonCategory: { include: { category: true } },
        Lesson: { where: { deleted: false } },
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
