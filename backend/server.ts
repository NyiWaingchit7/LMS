import express from "express";
import cors from "cors";
import { appRouter } from "./src/routes/app.route";
import { userRouter } from "./src/routes/user.route";
import { categoryRouter } from "./src/routes/category.route";
import { lectureRouter } from "./src/routes/lecture.route";
import { lessornRouter } from "./src/routes/lesson.route";

const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

app.use("/", appRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/lectures", lectureRouter);
app.use("/api/v1/lessons", lessornRouter);

app.listen(port, () => console.log(`server is runnig at ${port}`));
