import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { settings } from "firebase/analytics";

export const index = async (req: Request, res: Response) => {
  try {
    const data = await prisma.setting.findMany();
    let settings: { [key: string]: string | null } = {};
    data.map((item) => {
      settings[item?.key] = item.value;
    });
    return res.status(200).json({ settings });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    let settings;
    for (const key in data) {
      let value = data[key];

      settings = await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    return res.status(200).json({ settings });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
