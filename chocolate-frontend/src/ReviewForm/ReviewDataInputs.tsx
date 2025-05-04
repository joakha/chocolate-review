import { useFormContext } from "react-hook-form"
import { ReviewFormType } from "../types/types";
import ChocolateFlavorInputs from "./ChocolateFlavorInputs";
import ChocolatePicturesInput from "./ChocolatePicturesInput";

const ReviewDataInputs = () => {

    const { register, formState: { errors }, setValue, watch} = useFormContext<ReviewFormType>();

    const ratings = [0, 1, 2, 3, 4, 5];

    return (
        <div className="flex flex-col gap-4">
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

            <ChocolatePicturesInput />

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
                        {...register("recommended")}
                        onChange={(e) => setValue("recommended", e.target.checked)}
                        checked={watch("recommended")}
                        className="w-full"
                        id="recommended"
                    />
                    {errors.recommended &&
                        <p className="text-red-700 font-bold">{errors.recommended?.message}</p>
                    }
                </div>
            </div>
            
            <ChocolateFlavorInputs />

            <div className="flex gap-10">
                <div className="flex-1 flex-col flex">
                    <label htmlFor="rating" className="text-chocolate-light text-2xl font-bold">Rate the Chocolate</label>
                    <select
                        defaultValue=""
                        className=" border rounded p-1"
                        {...register("rating", { required: "Rating is required" })}
                    >
                        <option disabled value="">
                            Select rating
                        </option>
                        {ratings.map(rating => (
                            <option key={rating} value={rating}>
                                {rating}
                            </option>
                        ))}
                    </select>
                    {errors.rating &&
                        <p className="text-red-700 font-bold">{errors.rating?.message}</p>
                    }
                </div>
                <div className="flex-1">
                    <label htmlFor="price" className="text-chocolate-light text-2xl font-bold">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        min={1}
                        id="price"
                        className="border rounded w-full py-1 px-2"
                    />
                    {errors.price &&
                        <p className="text-red-700 font-bold">{errors.price?.message}</p>
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