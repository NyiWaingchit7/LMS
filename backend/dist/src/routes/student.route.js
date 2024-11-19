"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../utils/auth");
const student_controller_1 = require("../controller/student.controller");
const student_validator_1 = require("../validator/student.validator");
exports.studentRouter = express_1.default.Router();
exports.studentRouter.get("/", auth_1.checkauth, student_controller_1.index);
exports.studentRouter.get("/:id", auth_1.checkauth, student_controller_1.show);
exports.studentRouter.post("/register", student_controller_1.register);
exports.studentRouter.post("/login", student_controller_1.login);
exports.studentRouter.post("/", auth_1.checkauth, student_validator_1.studentValidation, student_controller_1.store);
exports.studentRouter.put("/:id", auth_1.checkauth, student_validator_1.studentValidation, student_controller_1.update);
exports.studentRouter.delete("/:id", auth_1.checkauth, student_controller_1.destroy);
