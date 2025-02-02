import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./src/services/googleLogin";
dotenv.config();

import { adminRouterGroup } from "./src/routes/group/admin.route";
import { userRouterGroup } from "./src/routes/group/user.route";
import { verifyApiToken } from "./src/utils/auth";
import { config } from "./src/utils/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const port = 4000;
app.get(
  "/api/v1/auth/google",
  verifyApiToken,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log(config.frontenUrl);

    if (req.user) {
      const { student, token } = req.user as any;
      return res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" },"${config.frontenUrl}");
          window.close();
        </script>
      `);
    }
    return res.status(401).json({ message: "Google login failed" });
  }
);
//admin
app.use("/api/v1/admin", adminRouterGroup);
//user
app.use("/api/v1", userRouterGroup);
//default
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(port, () => console.log(`server is runnig at ${port}`));
