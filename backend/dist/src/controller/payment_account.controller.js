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
    const paymentAccounts = yield db_1.prisma.paymentAccount.findMany({
        where: searchKey
            ? { name: { contains: searchKey, mode: "insensitive" }, deleted: false }
            : { deleted: false },
        orderBy: { id: "desc" },
        include: { payment_bank: true },
    });
    const data = (0, pagination_1.usePagination)(10, paymentAccounts, req);
    return res.status(200).json({ data });
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const paymentAccount = yield db_1.prisma.paymentAccount.findFirst({
            where: { id, deleted: false },
            include: { payment_bank: true },
        });
        if (!paymentAccount)
            return res
                .status(400)
                .json({ message: "The paymentAccount can not be found!" });
        return res.status(200).json({ paymentAccount });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banks = yield db_1.prisma.paymentBank.findMany();
        return res.status(200).json({ banks });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.create = create;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone_number, payment_bank_id } = req.body;
    try {
        const paymentAccount = yield db_1.prisma.paymentAccount.create({
            data: { name, phone_number, payment_bank_id },
            include: { payment_bank: true },
        });
        return res.status(200).json({ paymentAccount });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, phone_number, payment_bank_id } = req.body;
    try {
        const exist = yield db_1.prisma.paymentAccount.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res
                .status(400)
                .json({ message: "The paymentAccount can not be found!" });
        const paymentAccount = yield db_1.prisma.paymentAccount.update({
            where: { id },
            data: { name, phone_number, payment_bank_id },
            include: { payment_bank: true },
        });
        return res.status(200).json({ paymentAccount });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.paymentAccount.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res
                .status(400)
                .json({ message: "The paymentAccount can not be found!" });
        yield db_1.prisma.paymentAccount.update({
            where: { id },
            data: { deleted: true },
        });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.destroy = destroy;
