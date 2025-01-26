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
exports.getPaymentBanks = exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const db_1 = require("../../utils/db");
const pagination_1 = require("../../utils/pagination");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKey = req.query.searchKey || "";
    const paymentBanks = yield db_1.prisma.paymentBank.findMany({
        where: searchKey
            ? { name: { contains: searchKey, mode: "insensitive" }, deleted: false }
            : { deleted: false },
        orderBy: { id: "desc" },
        include: { PaymentAccount: { where: { deleted: false } } },
    });
    const data = (0, pagination_1.usePagination)(10, paymentBanks, req);
    return res.status(200).json({ data });
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const paymentBank = yield db_1.prisma.paymentBank.findFirst({
            where: { id, deleted: false },
            include: { PaymentAccount: { where: { deleted: false } } },
        });
        if (!paymentBank)
            return res
                .status(400)
                .json({ message: "The paymentBank can not be found!" });
        return res.status(200).json({ paymentBank });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.show = show;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, assetUrl } = req.body;
    try {
        if (!name)
            return res.status(400).json({ message: "All fields are required!" });
        const paymentBank = yield db_1.prisma.paymentBank.create({
            data: { name, assetUrl },
        });
        return res.status(200).json({ paymentBank });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, assetUrl } = req.body;
    try {
        const exist = yield db_1.prisma.paymentBank.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res
                .status(400)
                .json({ message: "The paymentBank can not be found!" });
        if (!name)
            return res.status(400).json({ message: "All fields are required!" });
        const paymentBank = yield db_1.prisma.paymentBank.update({
            where: { id },
            data: { name, assetUrl },
            include: { PaymentAccount: { where: { deleted: false } } },
        });
        return res.status(200).json({ paymentBank });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.paymentBank.findFirst({
            where: { id, deleted: false },
        });
        if (!exist)
            return res
                .status(400)
                .json({ message: "The paymentBank can not be found!" });
        yield db_1.prisma.paymentBank.update({ where: { id }, data: { deleted: true } });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.destroy = destroy;
const getPaymentBanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.prisma.paymentBank.findMany({
            where: { deleted: false },
        });
        return res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getPaymentBanks = getPaymentBanks;
