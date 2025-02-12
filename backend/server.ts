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
import path from "path";
import { loadEmailTemplate } from "./src/helper/loadEmailTemplate";
import { appRouter } from "./src/routes/admin/app.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
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



//user-google login
app.get(
  "/api/v1/auth/google",
  verifyApiToken,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log(config.frontendUrl);
    console.log("ehllo");

    if (req.user) {
      const { student, token } = req.user as any;
      return res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" },"${config.frontendUrl}");
          window.close();
        </script>
      `);
    }
    return res.status(401).json({ message: "Google login failed" });
  }
);

app.get("/preview-email", async (req, res) => {
  const student = {
    name: "John Doe",
    email: "john@example.com",
    message: "Welcome to our platform!",
  };

  const emailContent = await loadEmailTemplate(
    "purchaseEmailTemplate",
    { student },
    "purchase"
  );
  if (!emailContent) {
    return res.status(404).send("Template not found.");
  }

  res.send(emailContent); // Render template as HTML in browser
});
//admin-login
app.use("/api/v1/admin/auth", verifyApiToken, appRouter);
//admin
app.use("/api/v1/admin", adminRouterGroup);



//user
app.use("/api/v1", userRouterGroup);

//default
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(port, () => console.log(`server is runnig at ${port}`));
