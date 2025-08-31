import { model, Schema, Types } from "mongoose";
import { Comment } from "../types/types";

const CommentSchema = new Schema<Comment>({
    content: {
        type: String,
        required: true
    },
    commenterName: {
        type: String,
        required: true
    },
    reviewId: {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true
    }
})

const CommentModel = model<Comment>("Comment", CommentSchema);

export default CommentModel