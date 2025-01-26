"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureRouter = void 0;
const express_1 = __importDefault(require("express"));
const lecture_controller_1 = require("../../controller/lecture.controller");
const auth_1 = require("../../../utils/auth");
const lecture_validator_1 = require("../../validator/lecture.validator");
exports.lectureRouter = express_1.default.Router();
exports.lectureRouter.get("/", auth_1.checkauth, lecture_controller_1.index);
exports.lectureRouter.get("/create", auth_1.checkauth, lecture_controller_1.create);
exports.lectureRouter.get("/:id", auth_1.checkauth, lecture_controller_1.show);
exports.lectureRouter.post("/", auth_1.checkauth, lecture_validator_1.lectureValidation, lecture_controller_1.store);
exports.lectureRouter.put("/:id", auth_1.checkauth, lecture_validator_1.lectureValidation, lecture_controller_1.update);
exports.lectureRouter.delete("/:id", auth_1.checkauth, lecture_controller_1.destroy);
