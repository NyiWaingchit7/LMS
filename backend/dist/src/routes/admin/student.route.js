"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../../controller/student.controller");
const student_validator_1 = require("../../validator/student.validator");
exports.studentRouter = express_1.default.Router();
exports.studentRouter.get("/", student_controller_1.index);
exports.studentRouter.get("/:id", student_controller_1.show);
exports.studentRouter.post("/", student_validator_1.studentValidation, student_controller_1.store);
exports.studentRouter.put("/:id", student_validator_1.studentValidation, student_controller_1.update);
exports.studentRouter.delete("/:id", student_controller_1.destroy);
