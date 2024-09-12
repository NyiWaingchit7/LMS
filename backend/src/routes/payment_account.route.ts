import express from "express";
import { checkauth } from "../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/payment_account.controller";

export const paymentAccountRouter = express.Router();

paymentAccountRouter.get("/", checkauth, index);

paymentAccountRouter.get("/:id", checkauth, show);

paymentAccountRouter.post("/", checkauth, store);

paymentAccountRouter.put("/:id", checkauth, update);

paymentAccountRouter.delete("/:id", checkauth, destroy);
