import { Request, Response } from "express";
import { getUserFromToken } from "../../utils/auth";
import { prisma } from "../../utils/db";
import { mailSend } from "../../utils/mailer";

export const store = async (req: Request, res: Response) => {
  try {
    const { lectureId, payment_assetUrl, total_price } = req.body;
    const user = getUserFromToken(req, res) as any;
    const purchase = await prisma.purchase.create({
      data: { lectureId, studentId: user.id, payment_assetUrl, total_price },
    });
    const student = await prisma.student.findFirst({
      where: { id: user?.id },
    });
    if (student) {
      mailSend(student?.email);
    }
    return res.status(200).json({ purchase });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
