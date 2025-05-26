import { useFormContext } from "react-hook-form";
import { ReviewFormType } from "../types/types";

const ChocolatePicturesInput = () => {
    const { watch, register, formState: { errors }, setValue } = useFormContext<ReviewFormType>();

    const pictureStrings = watch("pictureStrings");

    const removePicture = (e: React.MouseEvent<HTMLButtonElement>, Url: string) => {
        e.preventDefault();
        setValue("pictureStrings", pictureStrings.filter(pictureString => pictureString !== Url));
    }

    return (
        <div className="flex flex-col gap-4">
            <label htmlFor="pictures" className="text-chocolate-light text-2xl font-bold">Pictures (max 2)</label>
            {pictureStrings && (
                <div className="grid grid-cols-2 gap-4">
                    {pictureStrings.map((pictureString) => (
                        <div
                            key={pictureString}
                            className="relative group"
                        >
                            <img
                                src={pictureString}
                                className="min-h-full object-cover"
                            />
                            <button
                                onClick={(e) => removePicture(e, pictureString)}
                                className="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-chocolate-dark opacity-0 group-hover:opacity-100 text-white"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <input
                id="pictures"
                type="file"
                multiple
                accept="image/*"
                {...register("pictures", {
                    validate: (pictures: FileList) => {
                        if (pictures.length === 0 || pictures.length + (pictureStrings?.length || 0) > 2) {
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