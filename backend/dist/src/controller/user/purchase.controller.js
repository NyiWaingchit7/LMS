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
exports.store = void 0;
const auth_1 = require("../../utils/auth");
const db_1 = require("../../utils/db");
const purchaseEmailService_1 = require("../../services/mail/purchaseEmailService");
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId, payment_assetUrl, total_price } = req.body;
        const user = (0, auth_1.getUserFromToken)(req, res);
        const purchase = yield db_1.prisma.purchase.create({
            data: { lectureId, studentId: user.id, payment_assetUrl, total_price },
        });
        const student = yield db_1.prisma.student.findFirst({
            where: { id: user === null || user === void 0 ? void 0 : user.id },
        });
        if (student) {
            (0, purchaseEmailService_1.sendpurchaseEmail)({
                receiver: student === null || student === void 0 ? void 0 : student.email,
                templateName: "purchaseEmailTemplate",
            });
        }
        return res.status(200).json({ purchase });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.store = store;
