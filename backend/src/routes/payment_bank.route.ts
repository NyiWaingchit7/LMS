import express from "express";
import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/payment_bank.controller";

export const paymentBankRouter = express.Router();

paymentBankRouter.get("/", checkauth, index);

paymentBankRouter.get("/:id", checkauth, show);

paymentBankRouter.post("/", checkauth, store);

paymentBankRouter.put("/:id", checkauth, update);

paymentBankRouter.delete("/:id", checkauth, destroy);
