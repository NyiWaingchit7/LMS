import express from "express";

import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/page.controller";
import { pageValidation } from "../../validator/page.validator";

export const pageRouter = express.Router();

pageRouter.get("/", index);

pageRouter.get("/:id", show);

pageRouter.post("/", pageValidation, store);

pageRouter.put("/:id", pageValidation, update);

pageRouter.delete("/:id", destroy);
