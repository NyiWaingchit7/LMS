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
const db_1 = require("../../utils/db");
const pagination_1 = require("../../utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKey = req.query.searchKey || "";
    const taglines = yield db_1.prisma.tagLine.findMany({
        where: searchKey
            ? { deleted: false, title: { contains: searchKey, mode: "insensitive" } }
            : { deleted: false },
        orderBy: { id: "desc" },
    });
    const data = (0, pagination_1.usePagination)(10, taglines, req);
    return res.status(200).json({ data, query: req.query });
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const tagLine = yield db_1.prisma.tagLine.create({
            data: { title, description },
        });
        return res.status(200).json({ tagLine });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.store = store;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const tagLine = yield db_1.prisma.tagLine.findFirst({
            where: { id, deleted: false },
        });
        if (!tagLine)
            return res.status(400).json({ message: "This tagLine can not be found" });
        return res.status(200).json({ tagLine });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, description } = req.body;
    try {
        const exist = yield db_1.prisma.tagLine.findFirst({ where: { id } });
        if (!exist)
            return res.status(400).json({ message: "This tagLine can not be found" });
        const tagLine = yield db_1.prisma.tagLine.update({
            where: { id },
            data: { title, description },
        });
        return res.status(200).json({ tagLine });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.tagLine.findFirst({ where: { id } });
        if (!exist)
            return res.status(400).json({ message: "This tagLine can not be found" });
        yield db_1.prisma.lectureonCategory.deleteMany({ where: { categoryId: id } });
        yield db_1.prisma.tagLine.update({ where: { id }, data: { deleted: true } });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.destroy = destroy;
