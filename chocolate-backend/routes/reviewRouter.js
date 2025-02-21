import express from "express";
import { validateReviewPost, validateReviewEdit } from "../middleware/validateReview.js";
import { postReview, editReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.route("/")
    .post(validateReviewPost, postReview)

reviewRouter.route("/:id")
    .put(validateReviewEdit, editReview)

export default reviewRouter