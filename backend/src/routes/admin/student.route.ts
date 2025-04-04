import express from "express";

import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/student.controller";
import { studentValidation } from "../../validator/student.validator";

export const studentRouter = express.Router();

studentRouter.get("/", index);

studentRouter.get("/:id", show);

studentRouter.post("/", studentValidation, store);

studentRouter.put("/:id", studentValidation, update);

studentRouter.delete("/:id", destroy);
