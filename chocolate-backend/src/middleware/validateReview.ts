import { body, param } from "express-validator"

const validateCreateReview = [
    body("title").notEmpty().withMessage("Review title is required!"),
    body("chocolate").notEmpty().withMessage("Review chocolate is required!"),
    body("content").notEmpty().withMessage("Review content is required!"),
    body("recommended")
        .notEmpty()
        .isBoolean()
        .withMessage("Review recommendation required and must be boolean!"),
    body("rating")
        .notEmpty()
        .isNumeric()
        .withMessage("Review rating required and must be numeric!"),
    body("flavours")
        .notEmpty()
        .isArray()
        .withMessage("Review flavours required and must be array!"),
    body("price")
        .notEmpty()
        .isNumeric()
        .withMessage("Review price required and must be numeric!"),
];

const validateReviewGet = [
    param("id").notEmpty().withMessage("ID must be a query param")
]

export {
    validateCreateReview,
    validateReviewGet
}