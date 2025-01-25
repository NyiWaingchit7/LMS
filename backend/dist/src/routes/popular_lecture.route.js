"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularLectureRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("@/utils/auth");
const popular_lecture_validator_1 = require("@/validator/popular_lecture.validator");
const popular_lecture_controller_1 = require("@/controller/popular_lecture.controller");
exports.popularLectureRouter = express_1.default.Router();
exports.popularLectureRouter.use(auth_1.checkauth);
exports.popularLectureRouter.get("/", popular_lecture_controller_1.index);
exports.popularLectureRouter.get("/create", popular_lecture_controller_1.create);
exports.popularLectureRouter.get("/:id", popular_lecture_controller_1.detail);
exports.popularLectureRouter.post("/", popular_lecture_validator_1.popularLectureValidation, popular_lecture_controller_1.store);
exports.popularLectureRouter.put("/:id", popular_lecture_validator_1.popularLectureValidation, popular_lecture_controller_1.update);
exports.popularLectureRouter.delete("/:id", popular_lecture_controller_1.destroy);
