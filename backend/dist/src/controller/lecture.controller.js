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
exports.searchLecture = exports.destroy = exports.update = exports.store = exports.create = exports.show = exports.index = void 0;
const db_1 = require("../utils/db");
const pagination_1 = require("../utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchKey, isPremium, categoryId } = req.query;
    console.log(isPremium);
    const lectureData = yield db_1.prisma.lecture.findMany({
        where: Object.assign(Object.assign(Object.assign({ deleted: false }, (searchKey && {
            title: {
                contains: searchKey,
                mode: "insensitive",
            },
        })), (isPremium && {
            isPremium: isPremium === "true",
        })), (categoryId && {
            LectureonCategory: {
                some: {
                    categoryId: Number(categoryId),
                },
            },
        })),
        orderBy: { id: "desc" },
        include: {
            LectureonCategory: { include: { category: true } },
            Lesson: { where: { deleted: false }, select: { title: true } },
        },
    });
    const lectures = lectureData.map((lecture) => (Object.assign(Object.assign({}, lecture), { categories: lecture.LectureonCategory.map((lc) => lc.category) })));
    const data = (0, pagination_1.usePagination)(10, lectures, req);
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
        const categories = yield db_1.prisma.category.findMany();
        return res.status(200).json({ categories });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.create = create;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, assetUrl, isPremium, categories, price, discount_price, } = req.body;
    try {
        const lecture = yield db_1.prisma.lecture.create({
            data: { title, assetUrl, description, isPremium, price, discount_price },
        });
        const data = yield db_1.prisma.$transaction(categories.map((d) => db_1.prisma.lectureonCategory.create({
            data: { lectureId: lecture.id, categoryId: d },
        })));
        return res.status(200).json({ lecture });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, description, assetUrl, isPremium, categories, price, discount_price, } = req.body;
    try {
        const exist = yield db_1.prisma.lecture.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lecture can not be found!" });
        console.log(req.body);
        const lecture = yield db_1.prisma.lecture.update({
            where: { id },
            data: {
                title,
                description,
                isPremium,
                assetUrl,
                price: price !== null && price !== void 0 ? price : 0,
                discount_price: discount_price !== null && discount_price !== void 0 ? discount_price : 0,
            },
        });
        yield db_1.prisma.lectureonCategory.deleteMany({ where: { lectureId: id } });
        const data = yield db_1.prisma.$transaction(categories.map((d) => db_1.prisma.lectureonCategory.create({
            data: { lectureId: lecture.id, categoryId: d },
        })));
        return res.status(200).json({ lecture, data });
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
        const exist = yield db_1.prisma.lecture.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res.status(400).json({ message: "The lecture can not be found!" });
        yield db_1.prisma.lectureonCategory.deleteMany({ where: { lectureId: id } });
        yield db_1.prisma.lecture.update({ where: { id }, data: { deleted: true } });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.destroy = destroy;
const searchLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.prisma.lecture.findMany({
            where: { deleted: false },
        });
        return res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.searchLecture = searchLecture;
