"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentBankRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../utils/auth");
const payment_bank_controller_1 = require("../../controller/payment_bank.controller");
const payment_bank_validator_1 = require("../../validator/payment_bank.validator");
exports.paymentBankRouter = express_1.default.Router();
exports.paymentBankRouter.get("/", auth_1.checkauth, payment_bank_controller_1.index);
exports.paymentBankRouter.get("/:id", auth_1.checkauth, payment_bank_controller_1.show);
exports.paymentBankRouter.post("/", auth_1.checkauth, payment_bank_validator_1.paymentBankValidation, payment_bank_controller_1.store);
exports.paymentBankRouter.put("/:id", auth_1.checkauth, payment_bank_validator_1.paymentBankValidation, payment_bank_controller_1.update);
exports.paymentBankRouter.delete("/:id", auth_1.checkauth, payment_bank_controller_1.destroy);
