"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRouter = void 0;
const express_1 = __importDefault(require("express"));
const setting_controller_1 = require("../../controller/setting.controller");
const setting_validator_1 = require("../../validator/setting.validator");
exports.settingRouter = express_1.default.Router();
exports.settingRouter.get("/", setting_controller_1.index);
exports.settingRouter.post("/", setting_validator_1.settingValidation, setting_controller_1.store);
