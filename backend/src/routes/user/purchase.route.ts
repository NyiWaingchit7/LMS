import express from "express";

import { usercheckauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  update,
} from "../../controller/purchase.controller";
import { store } from "../../controller/user/purchase.controller";
import { purchaseValidation } from "../../validator/user/purchase.validator";

export const userPurchaseRouter = express.Router();

userPurchaseRouter.get("/", usercheckauth, index);

userPurchaseRouter.get("/:id", usercheckauth, show);

userPurchaseRouter.post("/", store);

userPurchaseRouter.put("/:id", usercheckauth, update);

userPurchaseRouter.delete("/:id", usercheckauth, destroy);
