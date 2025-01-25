"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruchaseRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("@/utils/auth");
const purchase_controller_1 = require("@/controller/purchase.controller");
const purchase_validator_1 = require("@/validator/purchase.validator");
exports.pruchaseRouter = express_1.default.Router();
exports.pruchaseRouter.use(auth_1.checkauth);
exports.pruchaseRouter.get("/", purchase_controller_1.index);
exports.pruchaseRouter.get("/create", purchase_controller_1.create);
exports.pruchaseRouter.get("/:id", purchase_controller_1.show);
exports.pruchaseRouter.post("/", purchase_validator_1.purchaseValidation, purchase_controller_1.store);
exports.pruchaseRouter.put("/:id", purchase_controller_1.update);
exports.pruchaseRouter.delete("/:id", purchase_controller_1.destroy);
