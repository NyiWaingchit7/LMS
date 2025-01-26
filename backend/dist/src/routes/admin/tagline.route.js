"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagLineRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../utils/auth");
const tagline_controller_1 = require("../../controller/tagline.controller");
const tagline_validator_1 = require("../../validator/tagline.validator");
exports.tagLineRouter = express_1.default.Router();
exports.tagLineRouter.get("/", auth_1.checkauth, tagline_controller_1.index);
exports.tagLineRouter.get("/:id", auth_1.checkauth, tagline_controller_1.show);
exports.tagLineRouter.post("/", auth_1.checkauth, tagline_validator_1.tagLineValidation, tagline_controller_1.store);
exports.tagLineRouter.put("/:id", auth_1.checkauth, tagline_validator_1.tagLineValidation, tagline_controller_1.update);
exports.tagLineRouter.delete("/:id", auth_1.checkauth, tagline_controller_1.destroy);
