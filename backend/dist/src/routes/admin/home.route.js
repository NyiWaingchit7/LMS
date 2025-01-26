"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../utils/auth");
const home_controller_1 = require("../../controller/home.controller");
exports.homeRouter = express_1.default.Router();
exports.homeRouter.get("/", auth_1.checkauth, home_controller_1.home);
