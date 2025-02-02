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
exports.index = void 0;
const db_1 = require("../../utils/db");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const all_course = yield db_1.prisma.lecture.count({ where: { deleted: false } });
    const free_course = yield db_1.prisma.lecture.count({
        where: { deleted: false, isPremium: false },
    });
    const premium_course = yield db_1.prisma.lecture.count({
        where: { deleted: false, isPremium: true },
    });
    const students = yield db_1.prisma.student.count({ where: { deleted: false } });
    return res
        .status(200)
        .json({ all_course, free_course, premium_course, students });
});
exports.index = index;
