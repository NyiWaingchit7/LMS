import express from "express";

import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/purchase.controller";
import { purchaseValidation } from "../validator/purchase.validator";

export const pruchaseRouter = express.Router();

pruchaseRouter.get("/", checkauth, index);

pruchaseRouter.get("/:id", checkauth, show);

pruchaseRouter.post("/", checkauth, purchaseValidation, store);

pruchaseRouter.put("/:id", checkauth, update);

pruchaseRouter.delete("/:id", checkauth, destroy);
