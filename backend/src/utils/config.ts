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
  apiKey:string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export const config: Config = {
  
  //FOR AUTH
  jwtSecret: process.env.JWT_SECRET || "",
  jwtStudentSecret: process.env.JWT_STUDENT_SECRET || "",
  apiSecret: process.env.API_SECERE_KEY || "",
  apiId: process.env.API_ID || "",
  
  //FOR APP LOGIN
  username: process.env.USERNAME_SEEDER || "",
  email: process.env.EMAIL_SEEDER || "",
  password: process.env.PASSWORD_SEEDER || "",

  //FOR MAIL SERVICE
  mailPassword: process.env.MAIL_APP_PASSWORD || "",
  mailSender: process.env.MAIL_SENDER || "",

  //FOR OAUTH
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLENT_SECRET || "",
  frontendUrl: process.env.FRONT_END_URL || "",
  callbackUrl: process.env.CALLBACK_URL || "",

  //FIREBASE
  apiKey: process.env.FIREBASE_API_KEY || "",
  authDomain:  process.env.FIREBASE_AUTH_DOMAIN || "",
  projectId:  process.env.FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId:  process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  appId:  process.env.FIREBASE_APP_ID || "",
  measurementId:  process.env.FIREBASE_MEASUREMENT_ID || "",
};
