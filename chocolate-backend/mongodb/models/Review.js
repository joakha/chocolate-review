import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: false,
        },
        poster: {
            type: String,
            required: true
        },
        types: {
            type: Array,
            required: false
        }
    },
    { timestamps: true }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel