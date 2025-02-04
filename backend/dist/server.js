"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const googleLogin_1 = __importDefault(require("./src/services/googleLogin"));
dotenv_1.default.config();
const admin_route_1 = require("./src/routes/group/admin.route");
const user_route_1 = require("./src/routes/group/user.route");
const auth_1 = require("./src/utils/auth");
const config_1 = require("./src/utils/config");
const path_1 = __importDefault(require("path"));
const loadEmailTemplate_1 = require("./src/helper/loadEmailTemplate");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "src", "views"));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
}));
app.use(googleLogin_1.default.initialize());
app.use(googleLogin_1.default.session());
const port = 4000;
app.get("/api/v1/auth/google", auth_1.verifyApiToken, googleLogin_1.default.authenticate("google", { scope: ["profile", "email"] }));
app.get("/api/v1/auth/google/callback", googleLogin_1.default.authenticate("google", { session: false }), (req, res) => {
    console.log(config_1.config.frontendUrl);
    console.log("ehllo");
    if (req.user) {
        const { student, token } = req.user;
        return res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" },"${config_1.config.frontendUrl}");
          window.close();
        </script>
      `);
    }
    return res.status(401).json({ message: "Google login failed" });
});
app.get("/preview-email", (req, res) => {
    const userData = {
        name: "John Doe",
        email: "john@example.com",
        message: "Welcome to our platform!",
    };
    const emailContent = (0, loadEmailTemplate_1.loadEmailTemplate)("purchaseEmailTemplate", userData);
    if (!emailContent) {
        return res.status(404).send("Template not found.");
    }
    res.send(emailContent); // Render template as HTML in browser
});
//admin
app.use("/api/v1/admin", admin_route_1.adminRouterGroup);
//user
app.use("/api/v1", user_route_1.userRouterGroup);
//default
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(port, () => console.log(`server is runnig at ${port}`));
