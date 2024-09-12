import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";

export const index = async (req: Request, res: Response) => {
  const paymentAccounts = await prisma.paymentAccount.findMany({
    where: { deleted: false },
  });
  return res.status(200).json({ paymentAccounts });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const paymentAccount = await prisma.paymentAccount.findFirst({
      where: { id, deleted: false },
    });
    if (!paymentAccount)
      return res
        .status(400)
        .json({ message: "The paymentAccount can not be found!" });
    return res.status(200).json({ paymentAccount });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { name, phone_number, payment_bank_id } = req.body;
  try {
    const isvalid = name && phone_number && payment_bank_id;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });
    const paymentAccount = await prisma.paymentAccount.create({
      data: { name, phone_number, payment_bank_id },
    });

    return res.status(200).json({ paymentAccount });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, phone_number, payment_bank_id } = req.body;
  try {
    const exist = await prisma.paymentAccount.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res
        .status(400)
        .json({ message: "The paymentAccount can not be found!" });

    const isvalid = name && phone_number && payment_bank_id;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });

    const paymentAccount = await prisma.paymentAccount.update({
      where: { id },
      data: { name, phone_number, payment_bank_id },
    });

    return res.status(200).json({ paymentAccount });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.paymentAccount.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res
        .status(400)
        .json({ message: "The paymentAccount can not be found!" });

    await prisma.paymentAccount.update({
      where: { id },
      data: { deleted: true },
    });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
