import express, { Request, Response } from "express";
import { categoryRouter } from "../admin/category.route";
import { homeRouter } from "../admin/home.route";
import { lectureRouter } from "../admin/lecture.route";
import { lessonRouter } from "../admin/lesson.route";
import { pageRouter } from "../admin/page.route";
import { paymentAccountRouter } from "../admin/payment_account.route";
import { paymentBankRouter } from "../admin/payment_bank.route";
import { pruchaseRouter } from "../admin/purchase.route";
import { settingRouter } from "../admin/setting.route";
import { studentRouter } from "../admin/student.route";
import { tagLineRouter } from "../admin/tagline.route";
import { userRouter } from "../admin/user.route";
import { appRouter } from "../admin/app.route";
import { checkauth, verifyApiToken } from "../../../utils/auth";
import multer from "multer";
import { fileDelete, fileUpload } from "../../../utils/fileUpload";
import { searchLecture } from "../../controller/lecture.controller";
import { getPaymentBanks } from "../../controller/payment_bank.controller";
import { createPurchase } from "../../controller/purchase.controller";
import { popularLectureRouter } from "../admin/popular_lecture.route";
const upload = multer({ storage: multer.memoryStorage() });

export const adminRouterGroup = express.Router();
adminRouterGroup.use(verifyApiToken);
adminRouterGroup.use("/auth", appRouter);
adminRouterGroup.use("/users", userRouter);
adminRouterGroup.use("/categories", categoryRouter);
adminRouterGroup.use("/lectures", lectureRouter);
adminRouterGroup.use("/lessons", lessonRouter);
adminRouterGroup.use("/students", studentRouter);
adminRouterGroup.use("/payment-banks", paymentBankRouter);
adminRouterGroup.use("/payment-accounts", paymentAccountRouter);
adminRouterGroup.use("/popular-lectures", popularLectureRouter);

adminRouterGroup.use("/purchases", pruchaseRouter);
adminRouterGroup.use("/pages", pageRouter);
adminRouterGroup.use("/home", homeRouter);
adminRouterGroup.use("/settings", settingRouter);
adminRouterGroup.use("/tag-lines", tagLineRouter);
adminRouterGroup.post(
  "/file-upload",
  checkauth,
  upload.array("files"),
  fileUpload
);
adminRouterGroup.delete("/file-delete", checkauth, fileDelete);
adminRouterGroup.get("/get-lectures", checkauth, searchLecture);
adminRouterGroup.get("/get-paymentbanks", checkauth, getPaymentBanks);
adminRouterGroup.get("/create-purchase", checkauth, createPurchase);
