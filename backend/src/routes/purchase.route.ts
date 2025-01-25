import express from "express";

import { checkauth } from "@/utils/auth";
import {
  create,
  destroy,
  index,
  show,
  store,
  update,
} from "@/controller/purchase.controller";
import { purchaseValidation } from "@/validator/purchase.validator";

export const pruchaseRouter = express.Router();
pruchaseRouter.use(checkauth);

pruchaseRouter.get("/", index);
pruchaseRouter.get("/create", create);

pruchaseRouter.get("/:id", show);

pruchaseRouter.post("/", purchaseValidation, store);

pruchaseRouter.put("/:id", update);

pruchaseRouter.delete("/:id", destroy);
