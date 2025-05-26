import { model, Schema } from "mongoose";
import { Review } from "../types/types";

const reviewSchema = new Schema<Review>({
    appUserId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    chocolate: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    recommended: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    flavors: [{
        type: String,
        required: true,
    }],
    price: {
        type: Number,
        required: true
    },
    pictureStrings: [{
        type: String,
        required: true
    }],
    editedAt: {
        type: Date,
        required: true
    }
})

const ReviewModel = model<Review>("Review", reviewSchema);

export default ReviewModel