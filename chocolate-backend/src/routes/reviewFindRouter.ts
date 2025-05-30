import express from "express"
import { findReviews } from "../controllers/reviewFindController";

const reviewFindRouter = express.Router();

reviewFindRouter.get(
    "/find",
    findReviews
)

export default reviewFindRouter