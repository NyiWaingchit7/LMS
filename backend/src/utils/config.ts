import dotenv from "dotenv";
dotenv.config();
interface Config {
  jwtSecret: string;
  jwtStudentSecret: string;
  username: string;
  email: string;
  password: string;
  apiSecret: string;
  apiId: string;
  mailSender: string;
  mailPassword: string;
  clientID: string;
  clientSecret: string;
  frontendUrl: string;
  callbackUrl: string;
}

export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  jwtStudentSecret: process.env.JWT_STUDENT_SECRET || "",
  username: process.env.USERNAME_SEEDER || "",
  email: process.env.EMAIL_SEEDER || "",
  password: process.env.PASSWORD_SEEDER || "",
  apiSecret: process.env.API_SECERE_KEY || "",
  apiId: process.env.API_ID || "",
  mailPassword: process.env.MAIL_APP_PASSWORD || "",
  mailSender: process.env.MAIL_SENDER || "",
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLENT_SECRET || "",
  frontendUrl: process.env.FRONT_END_URL || "",
  callbackUrl: process.env.CALLBACK_URL || "",
};
