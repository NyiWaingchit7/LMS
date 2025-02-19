import nodemailer from "nodemailer";
import { config } from "./config";
import { loadEmailTemplate } from "../helper/loadEmailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mailSender,
    pass: config.mailPassword,
  },
});

export const mailSend = async (
  receiver: string,
  body: any,
  subject?: string
) => {
  const info = await transporter.sendMail({
    from: config.mailSender,
    to: receiver,
    subject,
    html: body,
  });
};
