import express from "express";
import { userAuthRouter } from "../user/auth.route";
import { userCategoryRouter } from "../user/category.route";
import { userLectureRouter } from "../user/lecture.route";
import { userLessonRouter } from "../user/lesson.route";
import { userPaymentRouter } from "../user/payment.route";
import { userSettingRouter } from "../user/setting.route";
import { userTagLineRouter } from "../user/tagLine.route";

export const userRouterGroup = express.Router();
userRouterGroup.use("/api/v1/categories", userCategoryRouter);
userRouterGroup.use("/api/v1/lectures", userLectureRouter);
userRouterGroup.use("/api/v1/lessons", userLessonRouter);
userRouterGroup.use("/api/v1/payments", userPaymentRouter);
userRouterGroup.use("/api/v1/tag-lines", userTagLineRouter);
userRouterGroup.use("/api/v1/settings", userSettingRouter);

userRouterGroup.use("/api/v1/auth", userAuthRouter);
