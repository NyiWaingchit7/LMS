import express from "express";

import { usercheckauth } from "../../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/purchase.controller";
import { purchaseValidation } from "../../validator/purchase.validator";

export const userPurchaseRouter = express.Router();

userPurchaseRouter.get("/", usercheckauth, index);

userPurchaseRouter.get("/:id", usercheckauth, show);

userPurchaseRouter.post("/", usercheckauth, purchaseValidation, store);

userPurchaseRouter.put("/:id", usercheckauth, update);

userPurchaseRouter.delete("/:id", usercheckauth, destroy);
