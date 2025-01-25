"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPaymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const payment_account_controller_1 = require("@/controller/payment_account.controller");
exports.userPaymentRouter = express_1.default.Router();
exports.userPaymentRouter.get("/", payment_account_controller_1.index);
