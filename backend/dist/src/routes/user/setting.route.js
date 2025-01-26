"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSettingRouter = void 0;
const express_1 = __importDefault(require("express"));
const setting_controller_1 = require("../../controller/setting.controller");
exports.userSettingRouter = express_1.default.Router();
exports.userSettingRouter.get("/", setting_controller_1.index);
