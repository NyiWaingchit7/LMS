import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const index = async (req: Request, res: Response) => {
  const lessons = await prisma.lesson.findMany({ where: { deleted: false } });
  return res.status(200).json({ lessons });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const lesson = await prisma.lesson.findFirst({
      where: { id, deleted: false },
    });
    if (!lesson)
      return res.status(400).json({ message: "The lesson can not be found!" });
    return res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, description, content, assetImage, assetVideo } = req.body;
  try {
    const isvalid = title && description;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });
    const lesson = await prisma.lesson.create({
      data: { title, description, content, assetImage, assetVideo },
    });

    return res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, content, assetImage, assetVideo } = req.body;
  try {
    const exist = await prisma.lesson.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lesson can not be found!" });

    const isvalid = title && description;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });

    const lesson = await prisma.lesson.update({
      where: { id },
      data: { title, description, content, assetImage, assetVideo },
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
