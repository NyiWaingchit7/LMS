"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPurchaseRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("@/utils/auth");
const purchase_controller_1 = require("@/controller/purchase.controller");
const purchase_controller_2 = require("@/controller/user/purchase.controller");
const purchase_validator_1 = require("@/validator/user/purchase.validator");
exports.userPurchaseRouter = express_1.default.Router();
exports.userPurchaseRouter.get("/", auth_1.usercheckauth, purchase_controller_1.index);
exports.userPurchaseRouter.get("/:id", auth_1.usercheckauth, purchase_controller_1.show);
exports.userPurchaseRouter.post("/", purchase_validator_1.purchaseValidation, purchase_controller_2.store);
exports.userPurchaseRouter.put("/:id", auth_1.usercheckauth, purchase_controller_1.update);
exports.userPurchaseRouter.delete("/:id", auth_1.usercheckauth, purchase_controller_1.destroy);
