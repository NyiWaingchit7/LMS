import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/payment_bank.controller";
import { paymentBankValidation } from "../../validator/payment_bank.validator";

export const paymentBankRouter = express.Router();

paymentBankRouter.get("/", index);

paymentBankRouter.get("/:id", show);

paymentBankRouter.post("/", paymentBankValidation, store);

paymentBankRouter.put("/:id", paymentBankValidation, update);

paymentBankRouter.delete("/:id", destroy);
