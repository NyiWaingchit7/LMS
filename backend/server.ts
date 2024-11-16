import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { appRouter } from "./src/routes/app.route";
import { userRouter } from "./src/routes/user.route";
import { categoryRouter } from "./src/routes/category.route";
import { lectureRouter } from "./src/routes/lecture.route";
import { lessonRouter } from "./src/routes/lesson.route";
import { studentRouter } from "./src/routes/student.route";
import { paymentBankRouter } from "./src/routes/payment_bank.route";
import { paymentAccountRouter } from "./src/routes/payment_account.route";
import { pruchaseRouter } from "./src/routes/purchase.route";
import { checkauth } from "./utils/auth";
import { fileDelete, fileUpload } from "./utils/fileUpload";
import multer from "multer";
import { storage } from "./utils/firebaseConfig";
import { pageRouter } from "./src/routes/page.route";
import { searchLecture } from "./src/controller/lecture.controller";
import { getPaymentBanks } from "./src/controller/payment_bank.controller";
import { createPurchase } from "./src/controller/purchase.controller";
import { homeRouter } from "./src/routes/home.route";

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
app.get('/', (req:Request,res:Response)=>{
res.send('hello')
})
app.listen(port, () => console.log(`server is runnig at ${port}`));
