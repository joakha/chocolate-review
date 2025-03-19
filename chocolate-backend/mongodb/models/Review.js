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
        type: {
            type: mongoose.Schema.ObjectId, ref: "type",
            required: true
        }
    },
    { timestamps: true }
);

const ReviewModel = mongoose.model("review", ReviewSchema);

export default ReviewModel