import express from "express";

import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/student.controller";

export const studentRouter = express.Router();

studentRouter.get("/", checkauth, index);

studentRouter.get("/:id", checkauth, show);

studentRouter.post("/", checkauth, store);

studentRouter.put("/:id", checkauth, update);

studentRouter.delete("/:id", checkauth, destroy);
