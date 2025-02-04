"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendpurchaseEmail = void 0;
const mailer_1 = require("../../utils/mailer");
const loadEmailTemplate_1 = require("../../helper/loadEmailTemplate");
const sendpurchaseEmail = ({ receiver, templateName }) => {
    let emailContent = (0, loadEmailTemplate_1.loadEmailTemplate)(templateName, "");
    if (!emailContent) {
        emailContent = "<b>there is no template</b>";
        return;
    }
    (0, mailer_1.mailSend)(receiver, emailContent);
};
exports.sendpurchaseEmail = sendpurchaseEmail;
