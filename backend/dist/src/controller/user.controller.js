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
exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;
const db_1 = require("../utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.prisma.user.findMany({ where: { deleted: false } });
    return res.status(200).json({ users });
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const isValid = username && email && password;
        if (!isValid)
            return res.status(400).json({ message: "All fields are required" });
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.prisma.user.create({
            data: { username, email, password: hashPassword },
        });
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.store = store;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield db_1.prisma.user.findFirst({ where: { id, deleted: false } });
        if (!user)
            return res.status(404).json({ message: "This user can not be found!" });
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { username, email, password } = req.body;
    try {
        const isValid = username && email;
        if (!isValid)
            return res.status(400).json({ message: "All fields are required" });
        const exist = yield db_1.prisma.user.findFirst({ where: { id } });
        if (!exist)
            return res.status(404).json({ message: "This user can not be found!" });
        const user = yield db_1.prisma.user.update({
            where: { id },
            data: { username, email },
        });
        if (password) {
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            yield db_1.prisma.user.update({
                where: { id },
                data: { password: hashPassword },
            });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const exist = yield db_1.prisma.user.findFirst({ where: { id } });
        if (!exist)
            return res.status(404).json({ message: "This user can not be found!" });
        yield db_1.prisma.user.update({ where: { id }, data: { deleted: true } });
        return res.json({ message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.destroy = destroy;
