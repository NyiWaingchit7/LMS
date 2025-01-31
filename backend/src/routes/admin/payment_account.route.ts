import express from "express";
import {
  create,
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/payment_account.controller";
import { paymentAccountValidation } from "../../validator/payment_account.validator";

export const paymentAccountRouter = express.Router();

paymentAccountRouter.get("/", index);
paymentAccountRouter.get("/create", create);

paymentAccountRouter.get("/:id", show);

paymentAccountRouter.post("/", paymentAccountValidation, store);

paymentAccountRouter.put("/:id", paymentAccountValidation, update);

paymentAccountRouter.delete("/:id", destroy);
