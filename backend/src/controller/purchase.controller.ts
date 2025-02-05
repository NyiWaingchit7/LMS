import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { Status } from "@prisma/client";
import { usePagination } from "../utils/pagination";
import { sendpurchaseEmail } from "../services/mail/purchaseEmailService";

export const index = async (req: Request, res: Response) => {
  const searchKey = (req.query.searchKey as string) || "";

  const purchases = await prisma.purchase.findMany({
    orderBy: { id: "desc" },
    where: searchKey
      ? {
          student: {
            name: { contains: searchKey, mode: "insensitive" },
            deleted: false,
          },
        }
      : { deleted: false },
    include: { student: true, lecture: true },
  });
  const data = usePagination(10, purchases, req);
  return res.status(200).json({ data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const purchase = await prisma.purchase.findFirst({
      where: { id, deleted: false },
      include: { student: true, lecture: true },
    });

    if (!purchase)
      return res.status(404).json({ message: "This items is not found." });

    return res.status(200).json({ purchase });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    const lectures = await prisma.lecture.findMany();
    return res.status(200).json({ students, lectures });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { lectureId, studentId, payment_assetUrl, total_price } = req.body;

  try {
    const lecture = await prisma.lecture.findFirst({
      where: { id: lectureId },
      include: { Lesson: { where: { deleted: false } } },
    });
    const purchase = await prisma.purchase.create({
      data: { lectureId, studentId, payment_assetUrl, total_price },
    });
    const student = await prisma.student.findFirst({
      where: { id: studentId },
    });
    if (student) {
      sendpurchaseEmail({
        user: student?.email,
        templateName: "purchaseEmailTemplate",
        data: { student, lecture, purchase },
      });
    }
    return res.status(200).json({ purchase });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const { lectureId, studentId, payment_assetUrl, payment_status } = req.body;
  const id = Number(req.params.id);

  try {
    const isExist = await prisma.purchase.findFirst({
      where: { id, deleted: false },
    });

    if (!isExist)
      return res.status(404).json({ message: "This items is not found." });
    const purchase = await prisma.purchase.update({
      data: { lectureId, studentId, payment_assetUrl, payment_status },
      where: { id },
    });

    if (purchase.payment_status === "CONFIRMED") {
      await prisma.premiumStudent.create({
        data: { lectureId: purchase.lectureId, studentId: purchase.studentId },
      });
    } else if (purchase.payment_status === "CANCELLED") {
      const exist = await prisma.premiumStudent.findFirst({
        where: { lectureId: purchase.lectureId, studentId: purchase.studentId },
      });
      if (exist) {
        await prisma.premiumStudent.delete({
          where: { id: exist.id },
        });
      }
    }

    const student = await prisma.student.findFirst({
      where: { id: purchase.studentId },
    });
    const lecture = await prisma.lecture.findFirst({
      where: { id: purchase.lectureId },
      include: { Lesson: { where: { deleted: false } } },
    });

    if (student) {
      sendpurchaseEmail({
        user: student?.email,
        templateName: "purchaseEmailTemplate",
        data: { student, lecture, purchase },
      });
    }

    return res.status(200).json({ purchase });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const purchase = await prisma.purchase.findFirst({
      where: { id, deleted: false },
      include: { student: true, lecture: true },
    });
    if (!purchase)
      return res.status(404).json({ message: "This items is not found." });
    await prisma.purchase.update({ data: { deleted: true }, where: { id } });
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.findMany({
      where: { deleted: false },
    });
    const lecture = await prisma.lecture.findMany({
      where: { deleted: false },
    });
    return res.status(200).json({ student, lecture });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
