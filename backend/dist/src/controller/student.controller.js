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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const db_1 = require("@/utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const pagination_1 = require("@/utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKey = req.query.searchKey || "";
    const students = yield db_1.prisma.student.findMany({
        where: searchKey
            ? { name: { contains: searchKey, mode: "insensitive" }, deleted: false }
            : { deleted: false },
        orderBy: { id: "desc" },
    });
    const data = (0, pagination_1.usePagination)(10, students, req);
    return res.status(200).json({ data });
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const data = yield db_1.prisma.student.findFirst({
            where: { id, deleted: false },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                assetUrl: true,
                password: false,
            },
        });
        const purchase = yield db_1.prisma.purchase.findMany({
            where: { studentId: data === null || data === void 0 ? void 0 : data.id, deleted: false },
            include: { student: true, lecture: true },
        });
        if (!data)
            return res.status(400).json({ message: "The student can not be found!" });
        const student = Object.assign(Object.assign({}, data), { Purchase: purchase });
        return res.status(200).json({ student });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.show = show;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, assetUrl } = req.body;
    try {
        const hasPassword = yield bcrypt_1.default.hash(password, 10);
        const student = yield db_1.prisma.student.create({
            data: { name, email, password: hasPassword, phone, assetUrl },
        });
        return res.status(200).json({ student });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, email, password, phone, assetUrl } = req.body;
    try {
        const exist = yield db_1.prisma.student.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The student can not be found!" });
        const hasPassword = yield bcrypt_1.default.hash(password, 10);
        const student = yield db_1.prisma.student.update({
            where: { id },
            data: { name, email, password: hasPassword, phone, assetUrl },
        });
        return res.status(200).json({ student });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.student.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The student can not be found!" });
        yield db_1.prisma.student.update({ where: { id }, data: { deleted: true } });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.destroy = destroy;
