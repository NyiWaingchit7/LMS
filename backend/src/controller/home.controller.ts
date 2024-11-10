import { Request, Response } from "express";
import { prisma } from "../../utils/db";
import { Purchase, Status } from "@prisma/client";

export const home = async (req: Request, res: Response) => {
  try {
    const totalStudent = await prisma.student.count();
    const totalLesson = await prisma.lesson.count();
    const totalLecture = await prisma.lecture.count();
    const totalPurchase = await prisma.purchase.count({
      where: { payment_status: "CONFIRMED" },
    });
    const { topCustomer } = await getTopCustomer();
    const { topLecture } = await getTopLecture();
    const purchases = await prisma.purchase.findMany({
      where: { payment_status: "CONFIRMED" },
      include: { student: true, lecture: true },

      take: 10,
    });
    return res.status(200).json({
      totalLesson,
      totalStudent,
      totalLecture,
      totalPurchase,
      topCustomer,
      topLecture,
      purchases,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getTopCustomer = async () => {
  const topStudents = await prisma.purchase.groupBy({
    by: ["studentId"],
    where: { payment_status: Status.CONFIRMED },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },

    take: 5,
  });
  const studentIds = topStudents.map((student) => student.studentId);
  const studentWithTotalPrice = await prisma.purchase.findMany({
    where: {
      studentId: { in: studentIds },
      payment_status: Status.CONFIRMED,
    },
    select: {
      studentId: true,
      lecture: true,
      student: true,
      total_price: true,
    },
  });
  const topCustomer = topStudents.map((student) => {
    const studentPurchase = studentWithTotalPrice.filter(
      (data) => data.studentId === student.studentId
    );
    let totalPurchasePrice = 0;
    studentPurchase.map(
      (purchase) => (totalPurchasePrice += purchase.total_price),
      0
    );
    return {
      purchaseCount: student._count,
      totalPurchasePrice,
      student: studentPurchase.find(
        (data) => data.studentId === student.studentId
      )?.student,
    };
  });

  return { topCustomer };
};

const getTopLecture = async () => {
  const groupLecture = await prisma.purchase.groupBy({
    by: ["lectureId"],
    where: { payment_status: "CONFIRMED" },

    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: 5,
  });
  const lectureIds = groupLecture.map((data) => data.lectureId);
  const lectureWithTotalCount = await prisma.purchase.findMany({
    where: { lectureId: { in: lectureIds }, payment_status: "CONFIRMED" },
    select: { lectureId: true, lecture: true },
  });
  const topLecture = groupLecture.map((lecture) => {
    const totalLecture = lectureWithTotalCount.filter(
      (data) => data.lectureId === lecture.lectureId
    );

    return {
      purchaseCount: lecture._count.id,
      lecture: totalLecture.find((data) => data.lectureId === lecture.lectureId)
        ?.lecture,
    };
  });

  return { topLecture };
};
