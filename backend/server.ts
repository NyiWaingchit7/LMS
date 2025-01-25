import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import { appRouter } from "@/routes/app.route";
import { searchLecture } from "@/controller/lecture.controller";
import { getPaymentBanks } from "@/controller/payment_bank.controller";
import { createPurchase } from "@/controller/purchase.controller";
import { categoryRouter } from "@/routes/category.route";
import { homeRouter } from "@/routes/home.route";
import { lectureRouter } from "@/routes/lecture.route";
import { lessonRouter } from "@/routes/lesson.route";
import { pageRouter } from "@/routes/page.route";
import { paymentAccountRouter } from "@/routes/payment_account.route";
import { paymentBankRouter } from "@/routes/payment_bank.route";
import { pruchaseRouter } from "@/routes/purchase.route";
import { settingRouter } from "@/routes/setting.route";
import { studentRouter } from "@/routes/student.route";
import { tagLineRouter } from "@/routes/tagline.route";
import { userRouter } from "@/routes/user.route";
import { userAuthRouter } from "@/routes/user/auth.route";
import { userCategoryRouter } from "@/routes/user/category.route";
import { userLectureRouter } from "@/routes/user/lecture.route";
import { userLessonRouter } from "@/routes/user/lesson.route";
import { userPaymentRouter } from "@/routes/user/payment.route";
import { userSettingRouter } from "@/routes/user/setting.route";
import { userTagLineRouter } from "@/routes/user/tagLine.route";
import { checkauth } from "@/utils/auth";
import { fileUpload, fileDelete } from "@/utils/fileUpload";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

const port = 4000;

app.use("/api/v1/admin/auth", appRouter);
app.use("/api/v1/admin/users", userRouter);
app.use("/api/v1/admin/categories", categoryRouter);
app.use("/api/v1/admin/lectures", lectureRouter);
app.use("/api/v1/admin/lessons", lessonRouter);
app.use("/api/v1/admin/students", studentRouter);
app.use("/api/v1/admin/payment-banks", paymentBankRouter);
app.use("/api/v1/admin/payment-accounts", paymentAccountRouter);
app.use("/api/v1/admin/purchases", pruchaseRouter);
app.use("/api/v1/admin/pages", pageRouter);
app.use("/api/v1/admin/home", homeRouter);
app.use("/api/v1/admin/settings", settingRouter);
app.use("/api/v1/admin/tag-lines", tagLineRouter);

// user
app.use("/api/v1/categories", userCategoryRouter);
app.use("/api/v1/lectures", userLectureRouter);
app.use("/api/v1/lessons", userLessonRouter);
app.use("/api/v1/payments", userPaymentRouter);
app.use("/api/v1/tag-lines", userTagLineRouter);
app.use("/api/v1/settings", userSettingRouter);

app.use("/api/v1/auth", userAuthRouter);

app.post(
  "/api/v1/admin/file-upload",
  checkauth,
  upload.array("files"),
  fileUpload
);
app.delete("/api/v1/admin/file-delete", checkauth, fileDelete);
app.get("/api/v1/admin/get-lectures", checkauth, searchLecture);
app.get("/api/v1/admin/get-paymentbanks", checkauth, getPaymentBanks);
app.get("/api/v1/admin/create-purchase", checkauth, createPurchase);
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.listen(port, () => console.log(`server is runnig at ${port}`));
