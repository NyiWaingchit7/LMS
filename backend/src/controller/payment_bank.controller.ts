import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import bcrypt from "bcrypt";

export const index = async (req: Request, res: Response) => {
  const paymentBanks = await prisma.paymentBank.findMany({
    where: { deleted: false },
    include: { PaymentAccount: { where: { deleted: false } } },
  });
  return res.status(200).json({ paymentBanks });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const paymentBank = await prisma.paymentBank.findFirst({
      where: { id, deleted: false },
      include: { PaymentAccount: { where: { deleted: false } } },
    });
    if (!paymentBank)
      return res
        .status(400)
        .json({ message: "The paymentBank can not be found!" });
    return res.status(200).json({ paymentBank });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { name, assetUrl } = req.body;
  try {
    if (!name)
      return res.status(400).json({ message: "All fields are required!" });
    const paymentBank = await prisma.paymentBank.create({
      data: { name, assetUrl },
    });

    return res.status(200).json({ paymentBank });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, assetUrl } = req.body;
  try {
    const exist = await prisma.paymentBank.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res
        .status(400)
        .json({ message: "The paymentBank can not be found!" });

    if (!name)
      return res.status(400).json({ message: "All fields are required!" });

    const paymentBank = await prisma.paymentBank.update({
      where: { id },
      data: { name, assetUrl },
      include: { PaymentAccount: { where: { deleted: false } } },
    });

    return res.status(200).json({ paymentBank });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.paymentBank.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res
        .status(400)
        .json({ message: "The paymentBank can not be found!" });

    await prisma.paymentBank.update({ where: { id }, data: { deleted: true } });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
