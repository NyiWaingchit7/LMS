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
exports.destroy = exports.update = exports.store = exports.create = exports.show = exports.index = void 0;
const db_1 = require("../../utils/db");
const pagination_1 = require("../../utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKey = req.query.searchKey || "";
    const lessons = yield db_1.prisma.lesson.findMany({
        where: searchKey
            ? { title: { contains: searchKey, mode: "insensitive" }, deleted: false }
            : { deleted: false },
        include: { lecture: true },
        orderBy: { id: "desc" },
    });
    const data = (0, pagination_1.usePagination)(10, lessons, req);
    return res.status(200).json({ data });
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const lesson = yield db_1.prisma.lesson.findFirst({
            include: { lecture: true },
            where: { id, deleted: false },
        });
        if (!lesson)
            return res.status(400).json({ message: "The lesson can not be found!" });
        return res.status(200).json({ lesson });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lectures = yield db_1.prisma.lecture.findMany({
            where: { deleted: false },
        });
        return res.status(200).json({ lectures });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.create = create;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, content, assetImage, assetVideo, lectureId } = req.body;
    try {
        const lesson = yield db_1.prisma.lesson.create({
            data: { title, description, content, assetImage, assetVideo, lectureId },
        });
        return res.status(200).json({ lesson });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, description, content, assetImage, assetVideo, lectureId } = req.body;
    try {
        const exist = yield db_1.prisma.lesson.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lesson can not be found!" });
        const lesson = yield db_1.prisma.lesson.update({
            where: { id },
            data: { title, description, content, assetImage, assetVideo, lectureId },
            include: { lecture: true },
        });
        return res.status(200).json({ lesson });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.lesson.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lesson can not be found!" });
        yield db_1.prisma.lesson.update({ where: { id }, data: { deleted: true } });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.destroy = destroy;
