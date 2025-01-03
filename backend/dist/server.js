"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_route_1 = require("./src/routes/app.route");
const user_route_1 = require("./src/routes/user.route");
const category_route_1 = require("./src/routes/category.route");
const lecture_route_1 = require("./src/routes/lecture.route");
const lesson_route_1 = require("./src/routes/lesson.route");
const student_route_1 = require("./src/routes/student.route");
const payment_bank_route_1 = require("./src/routes/payment_bank.route");
const payment_account_route_1 = require("./src/routes/payment_account.route");
const purchase_route_1 = require("./src/routes/purchase.route");
const auth_1 = require("./utils/auth");
const fileUpload_1 = require("./utils/fileUpload");
const multer_1 = __importDefault(require("multer"));
const page_route_1 = require("./src/routes/page.route");
const lecture_controller_1 = require("./src/controller/lecture.controller");
const payment_bank_controller_1 = require("./src/controller/payment_bank.controller");
const purchase_controller_1 = require("./src/controller/purchase.controller");
const home_route_1 = require("./src/routes/home.route");
const category_route_2 = require("./src/routes/user/category.route");
const lecture_route_2 = require("./src/routes/user/lecture.route");
const lesson_route_2 = require("./src/routes/user/lesson.route");
const payment_route_1 = require("./src/routes/user/payment.route");
const auth_route_1 = require("./src/routes/user/auth.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const port = 4000;
app.use("/api/v1/admin/auth", app_route_1.appRouter);
app.use("/api/v1/admin/users", user_route_1.userRouter);
app.use("/api/v1/admin/categories", category_route_1.categoryRouter);
app.use("/api/v1/admin/lectures", lecture_route_1.lectureRouter);
app.use("/api/v1/admin/lessons", lesson_route_1.lessonRouter);
app.use("/api/v1/admin/students", student_route_1.studentRouter);
app.use("/api/v1/admin/payment-banks", payment_bank_route_1.paymentBankRouter);
app.use("/api/v1/admin/payment-accounts", payment_account_route_1.paymentAccountRouter);
app.use("/api/v1/admin/purchases", purchase_route_1.pruchaseRouter);
app.use("/api/v1/admin/pages", page_route_1.pageRouter);
app.use("/api/v1/admin/home", home_route_1.homeRouter);
// user
app.use("/api/v1/categories", category_route_2.userCategoryRouter);
app.use("/api/v1/lectures", lecture_route_2.userLectureRouter);
app.use("/api/v1/lessons", lesson_route_2.userLessonRouter);
app.use("/api/v1/payments", payment_route_1.userPaymentRouter);
app.use("/api/v1/auth", auth_route_1.userAuthRouter);
app.post("/api/v1/admin/file-upload", auth_1.checkauth, upload.array("files"), fileUpload_1.fileUpload);
app.delete("/api/v1/admin/file-delete", auth_1.checkauth, fileUpload_1.fileDelete);
app.get("/api/v1/admin/get-lectures", auth_1.checkauth, lecture_controller_1.searchLecture);
app.get("/api/v1/admin/get-paymentbanks", auth_1.checkauth, payment_bank_controller_1.getPaymentBanks);
app.get("/api/v1/admin/create-purchase", auth_1.checkauth, purchase_controller_1.createPurchase);
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(port, () => console.log(`server is runnig at ${port}`));
