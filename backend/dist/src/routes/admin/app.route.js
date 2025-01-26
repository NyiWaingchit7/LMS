"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const app_controller_1 = require("../../controller/app.controller");
exports.appRouter = express_1.default.Router();
exports.appRouter.get("/", app_controller_1.index);
exports.appRouter.post("/log-in", app_controller_1.login);
