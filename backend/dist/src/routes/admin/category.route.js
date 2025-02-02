"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../../controller/category.controller");
const category_validator_1 = require("../../validator/category.validator");
exports.categoryRouter = express_1.default.Router();
exports.categoryRouter.get("/", category_controller_1.index);
exports.categoryRouter.get("/:id", category_controller_1.show);
exports.categoryRouter.post("/", category_validator_1.categoryValidation, category_controller_1.store);
exports.categoryRouter.put("/:id", category_validator_1.categoryValidation, category_controller_1.update);
exports.categoryRouter.delete("/:id", category_controller_1.destroy);
