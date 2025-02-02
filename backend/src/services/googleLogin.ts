import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../utils/db";
import { config } from "../utils/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.clientID as string,
      clientSecret: config.clientSecret as string,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let student = await prisma.student.findFirst({
          where: { email: profile.emails?.[0]?.value },
        });

        if (!student) {
          // Register new student if not exists
          student = await prisma.student.create({
            data: {
              email: profile.emails?.[0]?.value!,
              name: profile.displayName,
            },
          });
        }

        const token = jwt.sign(student, config.jwtStudentSecret);

        done(null, { student, token });
      } catch (error) {
        done(error, "");
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
