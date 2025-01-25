"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("@/controller/category.controller");
exports.userCategoryRouter = express_1.default.Router();
exports.userCategoryRouter.get("/", category_controller_1.index);
exports.userCategoryRouter.get("/:id", category_controller_1.show);
