"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const db_1 = require("@/utils/db");
const client_1 = require("@prisma/client");
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalStudent = yield db_1.prisma.student.count();
        const totalLesson = yield db_1.prisma.lesson.count();
        const totalLecture = yield db_1.prisma.lecture.count();
        const totalPurchase = yield db_1.prisma.purchase.count({
            where: { payment_status: "CONFIRMED" },
        });
        const { topCustomer } = yield getTopCustomer();
        const { topLecture } = yield getTopLecture();
        const purchases = yield db_1.prisma.purchase.findMany({
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
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.home = home;
const getTopCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    const topStudents = yield db_1.prisma.purchase.groupBy({
        by: ["studentId"],
        where: { payment_status: client_1.Status.CONFIRMED },
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
    const studentWithTotalPrice = yield db_1.prisma.purchase.findMany({
        where: {
            studentId: { in: studentIds },
            payment_status: client_1.Status.CONFIRMED,
        },
        select: {
            studentId: true,
            lecture: true,
            student: true,
            total_price: true,
        },
    });
    const topCustomer = topStudents.map((student) => {
        var _a;
        const studentPurchase = studentWithTotalPrice.filter((data) => data.studentId === student.studentId);
        let totalPurchasePrice = 0;
        studentPurchase.map((purchase) => (totalPurchasePrice += purchase.total_price), 0);
        return {
            purchaseCount: student._count,
            totalPurchasePrice,
            student: (_a = studentPurchase.find((data) => data.studentId === student.studentId)) === null || _a === void 0 ? void 0 : _a.student,
        };
    });
    return { topCustomer };
});
const getTopLecture = () => __awaiter(void 0, void 0, void 0, function* () {
    const groupLecture = yield db_1.prisma.purchase.groupBy({
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
    const lectureWithTotalCount = yield db_1.prisma.purchase.findMany({
        where: { lectureId: { in: lectureIds }, payment_status: "CONFIRMED" },
        select: { lectureId: true, lecture: true },
    });
    const topLecture = groupLecture.map((lecture) => {
        var _a;
        const totalLecture = lectureWithTotalCount.filter((data) => data.lectureId === lecture.lectureId);
        return {
            purchaseCount: lecture._count.id,
            lecture: (_a = totalLecture.find((data) => data.lectureId === lecture.lectureId)) === null || _a === void 0 ? void 0 : _a.lecture,
        };
    });
    return { topLecture };
});
