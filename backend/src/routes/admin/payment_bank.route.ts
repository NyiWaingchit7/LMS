import express from "express";
import { checkauth } from "../../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/payment_bank.controller";
import { paymentBankValidation } from "../../validator/payment_bank.validator";

export const paymentBankRouter = express.Router();

paymentBankRouter.get("/", checkauth, index);

paymentBankRouter.get("/:id", checkauth, show);

paymentBankRouter.post("/", checkauth, paymentBankValidation, store);

paymentBankRouter.put("/:id", checkauth, paymentBankValidation, update);

paymentBankRouter.delete("/:id", checkauth, destroy);
