import nodemailer from "nodemailer";
import { config } from "./config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mailSender,
    pass: config.mailPassword,
  },
});

export const mailSend = async (receiver: string) => {
  const info = await transporter.sendMail({
    from: config.mailSender,
    to: receiver,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.accepted);
};
