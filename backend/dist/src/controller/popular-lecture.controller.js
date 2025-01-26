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
exports.detail = exports.destroy = exports.update = exports.store = exports.create = exports.show = exports.index = void 0;
const db_1 = require("../../utils/db");
const pagination_1 = require("../../utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchKey } = req.query;
    const lectureData = yield db_1.prisma.popularLecture.findMany({
        where: Object.assign({ deleted: false }, (searchKey && {
            title: {
                contains: searchKey,
                mode: "insensitive",
            },
        })),
        orderBy: { id: "desc" },
        include: {
            lecture: true,
        },
    });
    const data = (0, pagination_1.usePagination)(10, lectureData, req);
    return res.status(200).json({ data });
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const data = yield db_1.prisma.lecture.findFirst({
            where: { id, deleted: false },
            include: {
                LectureonCategory: { include: { category: true } },
                Lesson: { where: { deleted: false } },
            },
        });
        if (!data) {
            return res.status(404).json({ message: "The lecture can not be found!" });
        }
        const lecture = Object.assign(Object.assign({}, data), { categories: data.LectureonCategory.map((lc) => lc.category) });
        if (lecture.isPremium) {
            lecture.Lesson = data.Lesson.map((lesson, index) => {
                if (index >= 1) {
                    return Object.assign(Object.assign({}, lesson), { assetVideo: null });
                }
                return lesson;
            });
        }
        return res.status(200).json({ lecture });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lectures = yield db_1.prisma.lecture.findMany();
        return res.status(200).json({ lectures });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.create = create;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, lectureId } = req.body;
    try {
        const isExist = yield db_1.prisma.lecture.findFirst({
            where: { id: lectureId, deleted: false },
        });
        if (!isExist) {
            return res.status(404).json({ message: "The lecture can not be found!" });
        }
        const lecture = yield db_1.prisma.popularLecture.create({
            data: { title, lectureId },
        });
        return res.status(200).json({ lecture });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, lectureId } = req.body;
    try {
        const exist = yield db_1.prisma.popularLecture.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lecture can not be found!" });
        console.log(req.body);
        const lecture = yield db_1.prisma.popularLecture.update({
            where: { id },
            data: {
                title,
                lectureId,
            },
        });
        return res.status(200).json({ lecture });
    }
    catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.popularLecture.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lecture can not be found!" });
        yield db_1.prisma.popularLecture.update({
            data: { deleted: true },
            where: { id },
        });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.destroy = destroy;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.popularLecture.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lecture can not be found!" });
        return res.status(200).json({ data: exist });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.detail = detail;
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
