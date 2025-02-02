"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyApiToken = exports.getUserFromToken = exports.usercheckauth = exports.checkauth = void 0;
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
        const validate = (0, exports.getUserFromToken)(req, res);
        if (!validate)
            return res.status(401).json({ message: "unauthorize!" });
        next();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.usercheckauth = usercheckauth;
const getUserFromToken = (req, res) => {
    try {
        const header = req.headers;
        const authorization = header.authorization;
        if (!authorization)
            return res.status(401).json({ message: "unauthorize!" });
        const accessToken = authorization.split(" ")[1];
        const validate = jsonwebtoken_1.default.verify(accessToken, config_1.config.jwtStudentSecret);
        if (!validate) {
            return res.status(401).json({ message: "unauthorize!" });
        }
        else {
            return validate;
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.getUserFromToken = getUserFromToken;
const verifyApiToken = (req, res, next) => {
    const header = req.headers;
    const oauthToken = req.query.api_token;
    const authorization = header.api_token;
    if (!authorization && !oauthToken)
        return res.status(403).json({ message: "Invalid or expired token!" });
    const token = (authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1]) || oauthToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.apiSecret);
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.app) !== config_1.config.apiId) {
            return res.status(403).json({ error: "Forbidden: Invalid app" });
        }
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
exports.verifyApiToken = verifyApiToken;
