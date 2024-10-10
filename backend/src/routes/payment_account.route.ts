import express from "express";
import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/payment_account.controller";
import { paymentAccountValidation } from "../validator/payment_account.validator";

export const paymentAccountRouter = express.Router();

paymentAccountRouter.get("/", checkauth, index);

paymentAccountRouter.get("/:id", checkauth, show);

paymentAccountRouter.post("/", checkauth, paymentAccountValidation, store);

paymentAccountRouter.put("/:id", checkauth, paymentAccountValidation, update);

paymentAccountRouter.delete("/:id", checkauth, destroy);
