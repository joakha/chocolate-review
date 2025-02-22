import express from "express";
import { validateTypePost } from "../middleware/validateType.js";
import { getTypes, createType } from "../controllers/typeController.js";

const typeRouter = express.Router();

typeRouter.route("/")
    .post(validateTypePost, createType)
    .get(getTypes)

export default typeRouter