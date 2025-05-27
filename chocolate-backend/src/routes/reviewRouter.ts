import express from "express"
import pictureUpload from "../middleware/pictureUpload";
import { createReview, getReviews, getReviewById, updateReview } from "../controllers/reviewController";
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

reviewRouter.put("/:id",
    validateJWT,
    pictureUpload.array("pictures", 2),
    updateReview
)

export default reviewRouter