import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { adminRouterGroup } from "./src/routes/group/admin.route";
import { userRouterGroup } from "./src/routes/group/user.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 4000;
//admin
app.use("/api/v1/admin", adminRouterGroup);
//user
app.use("/api/v1", userRouterGroup);
//default
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.listen(port, () => console.log(`server is runnig at ${port}`));
