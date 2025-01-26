import express from "express";

import { checkauth } from "../../../utils/auth";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../../controller/page.controller";
import { pageValidation } from "../../validator/page.validator";

export const pageRouter = express.Router();

pageRouter.get("/", checkauth, index);

pageRouter.get("/:id", checkauth, show);

pageRouter.post("/", checkauth, pageValidation, store);

pageRouter.put("/:id", checkauth, pageValidation, update);

pageRouter.delete("/:id", checkauth, destroy);
