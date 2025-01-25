import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "@/controller/user.controller";
import { checkauth } from "@/utils/auth";

export const userRouter = express.Router();
userRouter.use(checkauth);

userRouter.get("/", index);

userRouter.get("/:id", show);

userRouter.post("/", store);

userRouter.put("/:id", update);

userRouter.delete("/:id", destroy);
