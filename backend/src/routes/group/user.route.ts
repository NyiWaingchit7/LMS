import express from "express";
import { userAuthRouter } from "../user/auth.route";
import { userCategoryRouter } from "../user/category.route";
import { userLectureRouter } from "../user/lecture.route";
import { userLessonRouter } from "../user/lesson.route";
import { userPaymentRouter } from "../user/payment.route";
import { userSettingRouter } from "../user/setting.route";
import { userTagLineRouter } from "../user/tagLine.route";
import { userPopularLectureRouter } from "../user/popular_lecture.route";
import { verifyApiToken } from "../../utils/auth";
import { index } from "../../controller/user/home.controller";
import { userPurchaseRouter } from "../user/purchase.route";
import { fileUpload } from "../../services/media/fileUpload";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

export const userRouterGroup = express.Router();

userRouterGroup.use(verifyApiToken);

userRouterGroup.use("/categories", userCategoryRouter);
userRouterGroup.use("/lectures", userLectureRouter);
userRouterGroup.use("/lessons", userLessonRouter);
userRouterGroup.use("/payments", userPaymentRouter);
userRouterGroup.use("/tag-lines", userTagLineRouter);
userRouterGroup.use("/settings", userSettingRouter);
userRouterGroup.use("/popular-lectures", userPopularLectureRouter);
userRouterGroup.use("/purchases", userPurchaseRouter);
userRouterGroup.use("/auth", userAuthRouter);
userRouterGroup.get("/home", index);

userRouterGroup.post("/file-upload", upload.array("files"), fileUpload);
