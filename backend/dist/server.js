"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_rout_1 = require("@/routes/group/admin.rout");
const user_route_1 = require("@/routes/group/user.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 4000;
//admin
app.use("/api/v1/admin", admin_rout_1.adminRouterGroup);
//user
app.use("api/v1", user_route_1.userRouterGroup);
//default
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(port, () => console.log(`server is runnig at ${port}`));
