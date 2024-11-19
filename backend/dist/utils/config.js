"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    jwtSecret: process.env.JWT_SECRET || "",
    jwtStudentSecret: process.env.JWT_STUDENT_SECRET || "",
    username: process.env.USERNAME_SEEDER || "",
    email: process.env.EMAIL_SEEDER || "",
    password: process.env.PASSWORD_SEEDER || "",
};
