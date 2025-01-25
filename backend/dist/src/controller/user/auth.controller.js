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
exports.generateRandomCode = exports.changePassword = exports.forgetPasswordChange = exports.forgetVerify = exports.forgetPassword = exports.profileDelete = exports.myProfile = exports.verify = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("@/utils/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/utils/config");
const node_cache_1 = __importDefault(require("node-cache"));
const auth_1 = require("@/utils/auth");
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
        if (!passwordValidate) {
            return res.status(400).json({ message: "Wrong password" });
        }
        const token = jsonwebtoken_1.default.sign(student, config_1.config.jwtStudentSecret);
        return res.status(200).json({ token, student });
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
            cache.del(email);
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
const myProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, auth_1.getUserFromToken)(req, res);
        const id = Number(user === null || user === void 0 ? void 0 : user.id);
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
        return res.status(500).json({ error });
    }
});
exports.myProfile = myProfile;
const profileDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, auth_1.getUserFromToken)(req, res);
        const id = Number(user === null || user === void 0 ? void 0 : user.id);
        yield db_1.prisma.student.delete({ where: { id } });
        return res.status(200).json({ message: "Deleted Account Successfully." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.profileDelete = profileDelete;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const isExist = yield db_1.prisma.student.findFirst({ where: { email } });
        if (!isExist)
            return res
                .status(404)
                .json({ message: "There is no user with this Email." });
        const code = (0, exports.generateRandomCode)();
        cache.set(email, code);
        return res.status(200).json({ code });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.forgetPassword = forgetPassword;
const forgetVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req.body;
        const cacheCode = cache.get(email);
        if (!cacheCode)
            res.status(400).json({ message: "Your code is invalids" });
        if (code === cacheCode) {
            cache.del(email);
            return res.status(200).json({ message: "Otp verify successfully." });
        }
        else {
            res.status(400).json({ message: "Your code is invalids" });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.forgetVerify = forgetVerify;
const forgetPasswordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_password, confirm_password, email } = req.body;
        // const user = getUserFromToken(req, res) as any;
        const user = yield db_1.prisma.student.findFirst({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "NO user with this crdential" });
        const hashPassword = yield bcrypt_1.default.hash(new_password, 10);
        const data = yield db_1.prisma.student.update({
            where: { id: user.id },
            data: { password: hashPassword },
        });
        return res.status(200).json({ message: "Password Changed Successfully." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.forgetPasswordChange = forgetPasswordChange;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //need validation
    try {
        const { old_password, new_password, confirm_password } = req.body;
        const user = (0, auth_1.getUserFromToken)(req, res);
        const hash = user === null || user === void 0 ? void 0 : user.password;
        const isOldPassword = yield bcrypt_1.default.compare(old_password, hash);
        if (!isOldPassword) {
            return res
                .status(400)
                .json({ message: "Your old password is not correct" });
        }
        const hashPassword = yield bcrypt_1.default.hash(new_password, 10);
        const data = yield db_1.prisma.student.update({
            where: { id: user.id },
            data: { password: hashPassword },
        });
        return res.status(200).json({ message: "Password Changed Successfully." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.changePassword = changePassword;
const generateRandomCode = (length = 6) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandomCode = generateRandomCode;
