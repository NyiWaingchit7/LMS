import express from "express";

import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  login,
  register,
  show,
  store,
  update,
} from "../controller/student.controller";
import { studentValidation } from "../validator/student.validator";

export const studentRouter = express.Router();

studentRouter.get("/", checkauth, index);

studentRouter.get("/:id", checkauth, show);

studentRouter.post("/register", register);

studentRouter.post("/login", login);

studentRouter.post("/", checkauth, studentValidation, store);

studentRouter.put("/:id", checkauth, studentValidation, update);

studentRouter.delete("/:id", checkauth, destroy);
