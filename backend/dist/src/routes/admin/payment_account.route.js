"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentAccountRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../utils/auth");
const payment_account_controller_1 = require("../../controller/payment_account.controller");
const payment_account_validator_1 = require("../../validator/payment_account.validator");
exports.paymentAccountRouter = express_1.default.Router();
exports.paymentAccountRouter.get("/", auth_1.checkauth, payment_account_controller_1.index);
exports.paymentAccountRouter.get("/create", auth_1.checkauth, payment_account_controller_1.create);
exports.paymentAccountRouter.get("/:id", auth_1.checkauth, payment_account_controller_1.show);
exports.paymentAccountRouter.post("/", auth_1.checkauth, payment_account_validator_1.paymentAccountValidation, payment_account_controller_1.store);
exports.paymentAccountRouter.put("/:id", auth_1.checkauth, payment_account_validator_1.paymentAccountValidation, payment_account_controller_1.update);
exports.paymentAccountRouter.delete("/:id", auth_1.checkauth, payment_account_controller_1.destroy);
