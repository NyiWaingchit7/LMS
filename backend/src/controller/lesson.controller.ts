import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { usePagination } from "../../utils/pagination";
import { fileRemove } from "../../utils/fileUpload";

export const index = async (req: Request, res: Response) => {
  const searchKey = (req.query.searchKey as string) || "";

  const lessons = await prisma.lesson.findMany({
    where: searchKey
      ? { title: { contains: searchKey, mode: "insensitive" }, deleted: false }
      : { deleted: false },
    include: { lecture: true },
    orderBy: { id: "desc" },
  });
  const data = usePagination(10, lessons, req);
  return res.status(200).json({ data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const lesson = await prisma.lesson.findFirst({
      include: { lecture: true },
      where: { id, deleted: false },
    });
    if (!lesson)
      return res.status(400).json({ message: "The lesson can not be found!" });
    return res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    const lectures = await prisma.lecture.findMany({
      where: { deleted: false },
    });
    return res.status(200).json({ lectures });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const store = async (req: Request, res: Response) => {
  const { title, description, content, assetImage, assetVideo, lectureId } =
    req.body;
  try {
    const lesson = await prisma.lesson.create({
      data: { title, description, content, assetImage, assetVideo, lectureId },
    });

    return res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, content, assetImage, assetVideo, lectureId } =
    req.body;
  try {
    const exist = await prisma.lesson.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lesson can not be found!" });
    if (exist.assetImage !== null && assetImage !== exist.assetImage) {
      fileRemove(exist.assetImage);
    }

    const lesson = await prisma.lesson.update({
      where: { id },
      data: { title, description, content, assetImage, assetVideo, lectureId },
      include: { lecture: true },
    });

    return res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.lesson.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lesson can not be found!" });

    await prisma.lesson.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
