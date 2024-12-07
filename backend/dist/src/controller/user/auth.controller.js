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
exports.generateRandomCode = exports.verify = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../../utils/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../utils/config");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 660 });
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, assetUrl } = req.body;
    try {
        const isvalid = name && email && password;
        if (!isvalid)
            return res.status(400).json({ message: "All fields are required!" });
        const code = (0, exports.generateRandomCode)();
        cache.set(email, code);
        return res.status(200).json({ code });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isvalid = email && password;
        if (!isvalid)
            return res.status(400).json({ message: "All fields are required" });
        const student = yield db_1.prisma.student.findFirst({ where: { email } });
        if (!student)
            return res
                .status(404)
                .json({ message: "There is no user with this email" });
        const passwordValidate = yield bcrypt_1.default.compare(password, student.password);
        if (!passwordValidate)
            return res.status(400).json({ message: "Wrong password" });
        const token = jsonwebtoken_1.default.sign(student, config_1.config.jwtStudentSecret);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.login = login;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, assetUrl, code } = req.body;
        const valid = name && email && password && code;
        if (!valid)
            return res.status(400).json({ message: "Email and code are requierd" });
        const cacheCode = cache.get(email);
        if (!cacheCode)
            res.status(400).json({ message: "Your code is invalids" });
        if (code === cacheCode) {
            const hasPassword = yield bcrypt_1.default.hash(password, 10);
            const student = yield db_1.prisma.student.create({
                data: { name, email, password: hasPassword, phone, assetUrl },
            });
            const token = jsonwebtoken_1.default.sign(student, config_1.config.jwtStudentSecret);
            return res.status(200).json({ student, token });
        }
        else {
            return res.status(400).json({ message: "Verification fail." });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.verify = verify;
const generateRandomCode = (length = 6) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandomCode = generateRandomCode;
