"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEmailTemplate = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
const loadEmailTemplate = (templateName, data) => {
    try {
        const templatePath = path_1.default.join("src", "views", "purchase", `${templateName}.ejs`);
        console.log(templatePath);
        const template = fs_1.default.readFileSync(templatePath, "utf-8");
        return ejs_1.default.render(template, data);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.loadEmailTemplate = loadEmailTemplate;
