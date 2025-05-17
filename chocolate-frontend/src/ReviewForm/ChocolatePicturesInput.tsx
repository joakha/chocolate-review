import { useFormContext } from "react-hook-form";
import { ReviewFormType } from "../types/types";

const ChocolatePicturesInput = () => {
    const { register, formState: { errors } } = useFormContext<ReviewFormType>();

    return (
        <div className="flex flex-col gap-4">
            <label htmlFor="pictures" className="text-chocolate-light text-2xl font-bold">Pictures (max 2)</label>
            <input
                id="pictures"
                type="file"
                multiple
                accept="image/*"
                {...register("pictures", {
                    validate: (pictures: FileList) => {
                        if (pictures.length === 0 || pictures.length > 2) {
                            return "At least one picture required and max is 2";
                        } else {
                            return true;
                        }
                    }
                })}
            />
            {errors.pictures &&
                <p className="text-red-700 font-bold">{errors.pictures?.message}</p>
            }
        </div>
    )
}

export default ChocolatePicturesInput