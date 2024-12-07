import express from "express";
import { index } from "../../controller/payment_account.controller";

export const userPaymentRouter = express.Router();

userPaymentRouter.get("/", index);