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
exports.login = exports.index = void 0;
const db_1 = require("../../utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../utils/config");
const index = (req, res) => {
    console.log("hello");
    return res.send("hello");
};
exports.index = index;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isvalid = email && password;
        if (!isvalid)
            return res.status(400).json({ message: "All fields are required" });
        const user = yield db_1.prisma.user.findFirst({ where: { email } });
        if (!user)
            return res
                .status(400)
                .json({ message: "There is no user with this email" });
        const passwordValidate = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValidate)
            return res.status(400).json({ message: "Wrong password" });
        const token = jsonwebtoken_1.default.sign(user, config_1.config.jwtSecret);
        return res.status(200).json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.login = login;
