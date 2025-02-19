import { Request, Response } from "express";
import { prisma } from "../utils/db";
import { usePagination } from "../utils/pagination";

export const index = async (req: Request, res: Response) => {
  const { searchKey } = req.query as any;

  const lectureData = await prisma.popularLecture.findMany({
    where: {
      deleted: false,
      ...(searchKey && {
        title: {
          contains: searchKey,
          mode: "insensitive",
        },
      }),
    },

    orderBy: { id: "desc" },
    include: {
      lecture: true,
    },
  });

  const data = usePagination(10, lectureData, req);
  return res.status(200).json({ ...data });
};

export const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = await prisma.lecture.findFirst({
      where: { id, deleted: false },
      include: {
        LectureonCategory: { include: { category: true } },
        Lesson: { where: { deleted: false } },
      },
    });
    if (!data) {
      return res.status(404).json({ message: "The lecture can not be found!" });
    }

    const lecture = {
      ...data,
      categories: data.LectureonCategory.map((lc) => lc.category),
    };
    if (lecture.isPremium) {
      lecture.Lesson = data.Lesson.map((lesson, index) => {
        if (index >= 1) {
          return {
            ...lesson,
            assetVideo: null,
          };
        }
        return lesson;
      });
    }

    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const lectures = await prisma.lecture.findMany();
    return res.status(200).json({ lectures });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, lectureId } = req.body;
  try {
    const isExist = await prisma.lecture.findFirst({
      where: { id: lectureId, deleted: false },
    });
    if (!isExist) {
      return res.status(404).json({ message: "The lecture can not be found!" });
    }
    const lecture = await prisma.popularLecture.create({
      data: { title, lectureId },
    });

    return res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, lectureId } = req.body;

  try {
    const exist = await prisma.popularLecture.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lecture can not be found!" });
    console.log(req.body);

    const lecture = await prisma.popularLecture.update({
      where: { id },
      data: {
        title,
        lectureId,
      },
    });

    return res.status(200).json({ lecture });
  } catch (error) {
    console.error("Prisma Error:", error);
    res.status(500).json({ error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.popularLecture.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lecture can not be found!" });
    await prisma.popularLecture.update({
      data: { deleted: true },
      where: { id },
    });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const detail = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const exist = await prisma.popularLecture.findFirst({
      where: { id, deleted: false },
    });
    if (!exist)
      return res.status(400).json({ message: "The lecture can not be found!" });

    return res.status(200).json({ data: exist });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// export const searchLecture = async (req: Request, res: Response) => {
//   try {
//     const data = await prisma.lecture.findMany({
//       where: { deleted: false },
//     });
//     return res.status(200).json({ data });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
