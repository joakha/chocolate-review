import express from "express"
import { findReviews, findReviewById } from "../controllers/reviewFindController";
import { validateReviewGet } from "../middleware/validateReview";

const reviewFindRouter = express.Router();

reviewFindRouter.get(
    "/find",
    findReviews
)

reviewFindRouter.get(
    "/:id",
    validateReviewGet,
    findReviewById
)

export default reviewFindRouter