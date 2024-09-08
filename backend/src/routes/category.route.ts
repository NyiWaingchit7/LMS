import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controller/category.controller";
import { checkauth } from "../../utils/auth";

export const categoryRouter = express.Router();

categoryRouter.get("/", checkauth, index);

categoryRouter.get("/:id", checkauth, show);

categoryRouter.post("/", checkauth, store);

categoryRouter.put("/:id", checkauth, update);

categoryRouter.delete("/:id", checkauth, destroy);
