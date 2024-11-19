"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../utils/auth");
const page_controller_1 = require("../controller/page.controller");
const page_validator_1 = require("../validator/page.validator");
exports.pageRouter = express_1.default.Router();
exports.pageRouter.get("/", auth_1.checkauth, page_controller_1.index);
exports.pageRouter.get("/:id", auth_1.checkauth, page_controller_1.show);
exports.pageRouter.post("/", auth_1.checkauth, page_validator_1.pageValidation, page_controller_1.store);
exports.pageRouter.put("/:id", auth_1.checkauth, page_validator_1.pageValidation, page_controller_1.update);
exports.pageRouter.delete("/:id", auth_1.checkauth, page_controller_1.destroy);
