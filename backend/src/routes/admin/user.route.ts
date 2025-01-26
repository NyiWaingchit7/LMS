import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/user.controller";
import { checkauth } from "../../../utils/auth";

export const userRouter = express.Router();

userRouter.get("/", checkauth, index);

userRouter.get("/:id", checkauth, show);

userRouter.post("/", checkauth, store);

userRouter.put("/:id", checkauth, update);

userRouter.delete("/:id", checkauth, destroy);
