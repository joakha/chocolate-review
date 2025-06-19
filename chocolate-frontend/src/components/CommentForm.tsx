import { CommentFormProps, CommentFormType } from "../types/types"
import { useForm } from "react-hook-form"

const CommentForm = ({ reviewId }: CommentFormProps) => {

    const { register, formState: { errors }, handleSubmit } = useForm<CommentFormType>();

    console.log(reviewId)

    const submitComment = handleSubmit(commentFormData => {
        console.log(commentFormData);
    })

    return (
        <form onSubmit={submitComment} className="flex flex-col gap-4">
            <div>
                <label htmlFor="comment" className="text-chocolate-light text-2xl font-bold">Write a Comment</label>
                <textarea
                    rows={10}
                    {...register("comment", { required: "Comment is required" })}
                    id="comment"
                    className="border rounded w-full py-1 px-2"
                />
                {errors.comment &&
                    <p className="text-red-700 font-bold">{errors.comment?.message}</p>
                }
            </div>
            <div>
                <button type="submit" className="bg-chocolate-milk rounded-md text-white p-2 font-bold text-2xl">
                    Save
                </button>
            </div>
        </form>
    )
}

export default CommentForm