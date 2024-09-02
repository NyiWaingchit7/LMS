import { prisma } from "../../utils/db";

export const index = () => {
  const lessons = prisma.lesson.findMany({ where: { deleted: false } });
};
