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
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.index = void 0;
const db_1 = require("../../utils/db");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.prisma.setting.findMany();
        let settings = {};
        data.map((item) => {
            settings[item.key] = item.value;
        });
        return res.status(200).json({ settings });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        let settings;
        for (const key in data) {
            let value = data[key];
            settings = yield db_1.prisma.setting.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }
        return res.status(200).json({ settings });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.store = store;
