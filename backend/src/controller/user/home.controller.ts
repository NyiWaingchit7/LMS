import { Request, Response } from "express";
import { prisma } from "../../utils/db";
export const index = async (req: Request, res: Response) => {
  const all_course = await prisma.lecture.count({ where: { deleted: false } });
  const free_course = await prisma.lecture.count({
    where: { deleted: false, isPremium: false },
  });
  const premium_course = await prisma.lecture.count({
    where: { deleted: false, isPremium: true },
  });

  const students = await prisma.student.count({ where: { deleted: false } });

  return res
    .status(200)
    .json({ all_course, free_course, premium_course, students });
};
