"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const admin_route_1 = require("./src/routes/group/admin.route");
const user_rout_1 = require("./src/routes/group/user.rout");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 4000;
//admin
app.use("/api/v1/admin", admin_route_1.adminRouterGroup);
//user
app.use("api/v1", user_rout_1.userRouterGroup);
//default
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(port, () => console.log(`server is runnig at ${port}`));
