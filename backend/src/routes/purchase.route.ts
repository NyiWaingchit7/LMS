import express from "express";

import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/purchase.controller";

export const pruchaseRouter = express.Router();

pruchaseRouter.get("/", checkauth, index);

pruchaseRouter.get("/:id", checkauth, show);

pruchaseRouter.post("/", checkauth, store);

pruchaseRouter.put("/:id", checkauth, update);

pruchaseRouter.delete("/:id", checkauth, destroy);
