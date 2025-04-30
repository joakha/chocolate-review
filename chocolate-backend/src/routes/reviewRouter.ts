import express from "express"
import { pictureUpload } from "../middleware/pictureUpload";

const reviewRouter = express.Router();

reviewRouter.post("/", pictureUpload.array("pictures", 2))