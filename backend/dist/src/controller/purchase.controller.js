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
exports.createPurchase = exports.destroy = exports.update = exports.store = exports.create = exports.show = exports.index = void 0;
const db_1 = require("@/utils/db");
const pagination_1 = require("@/utils/pagination");
const mailer_1 = require("@/utils/mailer");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKey = req.query.searchKey || "";
    const purchases = yield db_1.prisma.purchase.findMany({
        orderBy: { id: "desc" },
        where: searchKey
            ? {
                student: {
                    name: { contains: searchKey, mode: "insensitive" },
                    deleted: false,
                },
            }
            : { deleted: false },
        include: { student: true, lecture: true },
    });
    const data = (0, pagination_1.usePagination)(10, purchases, req);
    return res.status(200).json({ data });
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const purchase = yield db_1.prisma.purchase.findFirst({
            where: { id, deleted: false },
            include: { student: true, lecture: true },
        });
        if (!purchase)
            return res.status(404).json({ message: "This items is not found." });
        return res.status(200).json({ purchase });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield db_1.prisma.student.findMany();
        const lectures = yield db_1.prisma.lecture.findMany();
        return res.status(200).json({ students, lectures });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.create = create;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId, studentId, payment_assetUrl, total_price } = req.body;
    try {
        const purchase = yield db_1.prisma.purchase.create({
            data: { lectureId, studentId, payment_assetUrl, total_price },
        });
        (0, mailer_1.mailSend)();
        return res.status(200).json({ purchase });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId, studentId, payment_assetUrl, payment_status } = req.body;
    const id = Number(req.params.id);
    try {
        const isExist = yield db_1.prisma.purchase.findFirst({
            where: { id, deleted: false },
        });
        if (!isExist)
            return res.status(404).json({ message: "This items is not found." });
        const purchase = yield db_1.prisma.purchase.update({
            data: { lectureId, studentId, payment_assetUrl, payment_status },
            where: { id },
        });
        if (purchase.payment_status === "CONFIRMED") {
            yield db_1.prisma.premiumStudent.create({
                data: { lectureId: purchase.lectureId, studentId: purchase.studentId },
            });
        }
        else if (purchase.payment_status === "CANCELLED") {
            const exist = yield db_1.prisma.premiumStudent.findFirst({
                where: { lectureId: purchase.lectureId, studentId: purchase.studentId },
            });
            if (exist) {
                yield db_1.prisma.premiumStudent.delete({
                    where: { id: exist.id },
                });
            }
        }
        (0, mailer_1.mailSend)();
        return res.status(200).json({ purchase });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const purchase = yield db_1.prisma.purchase.findFirst({
            where: { id, deleted: false },
            include: { student: true, lecture: true },
        });
        if (!purchase)
            return res.status(404).json({ message: "This items is not found." });
        yield db_1.prisma.purchase.update({ data: { deleted: true }, where: { id } });
        return res.status(200).json({ message: "deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.destroy = destroy;
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield db_1.prisma.student.findMany({
            where: { deleted: false },
        });
        const lecture = yield db_1.prisma.lecture.findMany({
            where: { deleted: false },
        });
        return res.status(200).json({ student, lecture });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.createPurchase = createPurchase;
