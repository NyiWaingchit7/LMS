import express from "express";

import {
  create,
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/purchase.controller";
import { purchaseValidation } from "../../validator/purchase.validator";

export const pruchaseRouter = express.Router();

pruchaseRouter.get("/", index);
pruchaseRouter.get("/create", create);

pruchaseRouter.get("/:id", show);

pruchaseRouter.post("/", purchaseValidation, store);

pruchaseRouter.put("/:id", update);

pruchaseRouter.delete("/:id", destroy);
