import dotenv from "dotenv";
dotenv.config();
interface Config {
  jwtSecret: string;
  jwtStudentSecret: string;
  username: string;
  email: string;
  password: string;
}

export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  jwtStudentSecret: process.env.JWT_STUDENT_SECRET || "",
  username: process.env.USERNAME_SEEDER || "",
  email: process.env.EMAIL_SEEDER || "",
  password: process.env.PASSWORD_SEEDER || "",
};
