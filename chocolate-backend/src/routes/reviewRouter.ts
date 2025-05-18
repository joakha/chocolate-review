import express from "express"
import pictureUpload from "../middleware/pictureUpload";
import { createReview, getReviews, getReviewById } from "../controllers/reviewController";
import { validateJWT } from "../middleware/validateAppUser";
import { validateCreateReview } from "../middleware/validateReview";

const reviewRouter = express.Router();

reviewRouter.post(
    "/",
    validateJWT,
    pictureUpload.array("pictures", 2),
    validateCreateReview,
    createReview
);

reviewRouter.get("/",
    validateJWT,
    getReviews
)

reviewRouter.get("/:id",
    validateJWT,
    getReviewById
)

export default reviewRouter