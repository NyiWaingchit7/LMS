import { Request, Response } from "express";
import { getUserFromToken } from "../../utils/auth";
import { prisma } from "../../utils/db";
import { mailSend } from "../../utils/mailer";
import { sendpurchaseEmail } from "../../services/mail/purchaseEmailService";

export const store = async (req: Request, res: Response) => {
  try {
    const { lectureId, payment_assetUrl, total_price } = req.body;
    if (!payment_assetUrl) {
      return res
        .status(400)
        .json({ message: "Payment screenshot is required!" });
    }
    const user = getUserFromToken(req, res) as any;
    const purchase = await prisma.purchase.create({
      data: { lectureId, studentId: user.id, payment_assetUrl, total_price },
    });
    const student = await prisma.student.findFirst({
      where: { id: user?.id },
    });
    if (student) {
      sendpurchaseEmail({
        user: student?.email,
        templateName: purchase.payment_status,
        data: { student },
      });
    }
    return res.status(200).json({ purchase });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
