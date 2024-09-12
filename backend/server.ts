import express from "express";
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

const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

app.use("/api/v1/auth", appRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/lectures", lectureRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/payment-banks", paymentBankRouter);
app.use("/api/v1/payment-account", paymentAccountRouter);

app.listen(port, () => console.log(`server is runnig at ${port}`));
