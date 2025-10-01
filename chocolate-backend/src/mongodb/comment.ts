import { model, Schema, Types } from "mongoose";

type Comment = {
    content: string,
    commenterName: string,
    reviewId: Types.ObjectId
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
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true
    }
})

const CommentModel = model<Comment>("Comment", CommentSchema);

export default CommentModel

export type {
    Comment
}