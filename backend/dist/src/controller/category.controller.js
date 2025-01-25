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
exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;
const db_1 = require("@/utils/db");
const pagination_1 = require("@/utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKey = req.query.searchKey || "";
    const categories = yield db_1.prisma.category.findMany({
        where: searchKey
            ? { deleted: false, name: { contains: searchKey, mode: "insensitive" } }
            : { deleted: false },
        orderBy: { id: "desc" },
        include: { LectureonCategory: { include: { lecture: true } } },
    });
    const data = (0, pagination_1.usePagination)(10, categories, req);
    return res.status(200).json({ data, query: req.query });
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, assetUrl } = req.body;
    try {
        const category = yield db_1.prisma.category.create({
            data: { name, assetUrl },
            include: { LectureonCategory: { include: { lecture: true } } },
        });
        return res.status(200).json({ category });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.store = store;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const category = yield db_1.prisma.category.findFirst({
            where: { id, deleted: false },
            include: { LectureonCategory: { include: { lecture: true } } },
        });
        if (!category)
            return res
                .status(400)
                .json({ message: "This category can not be found" });
        return res.status(200).json({ category });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, assetUrl } = req.body;
    try {
        const exist = yield db_1.prisma.category.findFirst({ where: { id } });
        if (!exist)
            return res
                .status(400)
                .json({ message: "This category can not be found" });
        const category = yield db_1.prisma.category.update({
            where: { id },
            data: { name, assetUrl },
            include: { LectureonCategory: { include: { lecture: true } } },
        });
        return res.status(200).json({ category });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.category.findFirst({ where: { id } });
        if (!exist)
            return res
                .status(400)
                .json({ message: "This category can not be found" });
        yield db_1.prisma.lectureonCategory.deleteMany({ where: { categoryId: id } });
        yield db_1.prisma.category.update({ where: { id }, data: { deleted: true } });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.destroy = destroy;
