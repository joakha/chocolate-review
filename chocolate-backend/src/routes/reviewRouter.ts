import express from "express"
import pictureUpload from "../middleware/pictureUpload";
import { createReview, getReviews } from "../controllers/reviewController";
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

export default reviewRouter