"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTagLineRouter = void 0;
const express_1 = __importDefault(require("express"));
const tagline_controller_1 = require("@/controller/tagline.controller");
exports.userTagLineRouter = express_1.default.Router();
exports.userTagLineRouter.get("/", tagline_controller_1.index);
