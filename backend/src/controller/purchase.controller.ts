import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { Status } from "@prisma/client";
import { usePagination } from "../../utils/pagination";
import { send } from "../../utils/mailer";

export const index = async (req: Request, res: Response) => {
  const purchases = await prisma.purchase.findMany({
    orderBy: { id: "desc" },
    where: { deleted: false },
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

export const store = async (req: Request, res: Response) => {
  const { lectureId, studentId, payment_assetUrl } = req.body;

  try {
    const purchase = await prisma.purchase.create({
      data: { lectureId, studentId, payment_assetUrl },
    });
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

    const data = await send();

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
