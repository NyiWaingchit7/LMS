"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usercheckauth = exports.checkauth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const checkauth = (req, res, next) => {
    try {
        const header = req.headers;
        const authorization = header.authorization;
        if (!authorization)
            return res.status(401).json({ message: "unauthorize!" });
        const accessToken = authorization.split(" ")[1];
        const validate = jsonwebtoken_1.default.verify(accessToken, config_1.config.jwtSecret);
        if (!validate)
            return res.status(401).json({ message: "unauthorize!" });
        next();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.checkauth = checkauth;
const usercheckauth = (req, res, next) => {
    try {
        const header = req.headers;
        const authorization = header.authorization;
        if (!authorization)
            return res.status(401).json({ message: "unauthorize!" });
        const accessToken = authorization.split(" ")[1];
        const validate = jsonwebtoken_1.default.verify(accessToken, config_1.config.jwtStudentSecret);
        if (!validate)
            return res.status(401).json({ message: "unauthorize!" });
        next();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.usercheckauth = usercheckauth;
