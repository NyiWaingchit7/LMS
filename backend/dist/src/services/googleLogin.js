"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const db_1 = require("../utils/db");
const config_1 = require("../utils/config");
console.log("Google Redirect URI:", config_1.config.callbackUrl);
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.config.clientID,
    clientSecret: config_1.config.clientSecret,
    callbackURL: config_1.config.callbackUrl,
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let student = yield db_1.prisma.student.findFirst({
            where: { email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value },
        });
        if (!student) {
            // Register new student if not exists
            student = yield db_1.prisma.student.create({
                data: {
                    email: (_d = (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value,
                    name: profile.displayName,
                },
            });
        }
        const token = jsonwebtoken_1.default.sign(student, config_1.config.jwtStudentSecret);
        done(null, { student, token });
    }
    catch (error) {
        done(error, "");
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passport_1.default;
