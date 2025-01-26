"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouterGroup = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../user/auth.route");
const category_route_1 = require("../user/category.route");
const lecture_route_1 = require("../user/lecture.route");
const lesson_route_1 = require("../user/lesson.route");
const payment_route_1 = require("../user/payment.route");
const setting_route_1 = require("../user/setting.route");
const tagLine_route_1 = require("../user/tagLine.route");
const popular_lecture_route_1 = require("../user/popular_lecture.route");
exports.userRouterGroup = express_1.default.Router();
exports.userRouterGroup.use("/categories", category_route_1.userCategoryRouter);
exports.userRouterGroup.use("/lectures", lecture_route_1.userLectureRouter);
exports.userRouterGroup.use("/lessons", lesson_route_1.userLessonRouter);
exports.userRouterGroup.use("/payments", payment_route_1.userPaymentRouter);
exports.userRouterGroup.use("/tag-lines", tagLine_route_1.userTagLineRouter);
exports.userRouterGroup.use("/settings", setting_route_1.userSettingRouter);
exports.userRouterGroup.use("/popular-lectures", popular_lecture_route_1.userPopularLectureRouter);
exports.userRouterGroup.use("/auth", auth_route_1.userAuthRouter);
