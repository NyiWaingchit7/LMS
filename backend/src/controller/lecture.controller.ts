import { Request, Response } from "express";
import { prisma } from "../../utils/db";

export const index = async (req: Request, res: Response) => {
  const lectures = await prisma.lecture.findMany({ where: { deleted: false } });
  return res.status(200).json({ lectures });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const lecture = await prisma.lecture.findFirst({
      where: { id, deleted: false },
    });
    if (!lecture)
      return res.status(400).json({ message: "The lecture can not be found!" });
    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const isvalid = title && description;
    if (!isvalid) return res.status(400).json({ message: "Bad request!" });

    const lecture = await prisma.lecture.create({
      data: { title, description },
    });

    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  try {
    const exist = await prisma.lecture.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lecture can not be found!" });

    const isvalid = title && description;
    if (!isvalid) return res.status(400).json({ message: "Bad request!" });

    const lecture = await prisma.lecture.update({
      where: { id },
      data: { title, description },
    });

    return res.status(200).json({ lecture });
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

    await prisma.lecture.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
