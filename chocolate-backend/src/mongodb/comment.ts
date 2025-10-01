import { model, Schema } from "mongoose";

type Comment = {
    content: string,
    commenterName: string,
    reviewId: string
}

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
        type: String,
        ref: "Review",
        required: true
    }
})

const CommentModel = model<Comment>("Comment", CommentSchema);

export default CommentModel

export type {
    Comment
}