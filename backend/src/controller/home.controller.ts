import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { Status } from "@prisma/client";

export const home = async (req: Request, res: Response) => {
  try {
    const totalStudent = await prisma.student.count();
    const totalCourse = await prisma.lesson.count();
    const totalLecture = await prisma.lecture.count();
    const topStudents = await prisma.purchase.aggregate({
      _avg: {
        studentId: true,
      },
      where: { payment_status: Status.CONFIRMED },
    });
    return res
      .status(200)
      .json({ totalCourse, topStudents, totalStudent, totalLecture });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
