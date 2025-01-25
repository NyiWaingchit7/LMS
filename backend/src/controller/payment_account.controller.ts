import { Request, Response } from "express";
import { prisma } from "@/utils/db";
import bcrypt from "bcrypt";
import { usePagination } from "@/utils/pagination";

export const index = async (req: Request, res: Response) => {
  const searchKey = (req.query.searchKey as string) || "";

  const paymentAccounts = await prisma.paymentAccount.findMany({
    where: searchKey
      ? { name: { contains: searchKey, mode: "insensitive" }, deleted: false }
      : { deleted: false },
    orderBy: { id: "desc" },
    include: { payment_bank: true },
  });
  const data = usePagination(10, paymentAccounts, req);
  return res.status(200).json({ data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const paymentAccount = await prisma.paymentAccount.findFirst({
      where: { id, deleted: false },
      include: { payment_bank: true },
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

export const create = async (req: Request, res: Response) => {
  try {
    const banks = await prisma.paymentBank.findMany();
    return res.status(200).json({ banks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { name, phone_number, payment_bank_id } = req.body;
  try {
    const paymentAccount = await prisma.paymentAccount.create({
      data: { name, phone_number, payment_bank_id },
      include: { payment_bank: true },
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

    const paymentAccount = await prisma.paymentAccount.update({
      where: { id },
      data: { name, phone_number, payment_bank_id },
      include: { payment_bank: true },
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
