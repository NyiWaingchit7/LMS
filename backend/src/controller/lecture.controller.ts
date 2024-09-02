import { prisma } from "../../utils/db";

export const index = () => {
  const lecture = prisma.lecture.findMany({ where: { deleted: false } });
};
