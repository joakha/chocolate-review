import { useFormContext } from "react-hook-form"
import { ReviewFormType } from "../types/types";

const ReviewDataInputs = () => {

    const { register, formState: { errors } } = useFormContext<ReviewFormType>();

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-4xl text-chocolate-milk font-bold text-center">Create a Review</h2>
            <div>
                <label htmlFor="title" className="text-chocolate-light text-2xl font-bold">Title</label>
                <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    id="title"
                    className="border rounded w-full py-1 px-2"
                />
                {errors.title &&
                    <p className="text-red-700 font-bold">{errors.title?.message}</p>
                }
            </div>
            <div className="flex gap-10">
                <div className="flex-1">
                    <label htmlFor="chocolate" className="text-chocolate-light text-2xl font-bold">Chocolate</label>
                    <input
                        type="text"
                        {...register("chocolate", { required: "Chocolate is required" })}
                        id="chocolate"
                        className="border rounded w-full py-1 px-2"
                    />
                    {errors.chocolate &&
                        <p className="text-red-700 font-bold">{errors.chocolate?.message}</p>
                    }
                </div>
                <div className="flex flex-col flex-1 items-center gap-3">
                    <label htmlFor="recommended" className="text-chocolate-light text-2xl font-bold">Do you recommend this chocolate?</label>
                    <input
                        type="checkbox"
                        {...register("recommended", { required: "Recommendation is required" })}
                        className="w-full"
                        id="recommended"
                    />
                    {errors.recommended &&
                        <p className="text-red-700 font-bold">{errors.title?.message}</p>
                    }
                </div>
            </div>
            <div>
                <label htmlFor="content" className="text-chocolate-light text-2xl font-bold">Content</label>
                <textarea
                    rows={10}
                    {...register("content", { required: "Content is required" })}
                    id="content"
                    className="border rounded w-full py-1 px-2"
                />
                {errors.content &&
                    <p className="text-red-700 font-bold">{errors.content?.message}</p>
                }
            </div>
        </div>
    )
}

export default ReviewDataInputs