import express from "express";
import { validateReviewPost, validateReviewEdit, validateReviewDelete, validateReviewGet } from "../middleware/validateReview.js";
import { postReview, editReview, getReviews, deleteReview, getReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.route("/")
    .post(validateReviewPost, postReview)
    .get(getReviews)

reviewRouter.route("/:id")
    .put(validateReviewEdit, editReview)
    .delete(validateReviewDelete, deleteReview)
    .get(validateReviewGet, getReview)

export default reviewRouter