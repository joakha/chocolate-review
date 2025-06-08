import { useFormContext } from "react-hook-form";
import { ReviewFormType } from "../types/types";
import { flavors } from "../constants";

const ChocolateFlavorInputs = () => {


    const { register, formState: { errors }, watch } = useFormContext<ReviewFormType>();
    const selectedFlavors = watch("flavors") || [];

    return (
        <div>
            <h3 className="text-chocolate-light text-2xl font-bold">Flavors</h3>
            <div className="grid grid-cols-4 gap-3">
                {flavors.map(flavor => (
                    <label
                        key={flavor}
                        htmlFor={flavor}
                        className={`flex justify-center cursor-pointer ${selectedFlavors.includes(flavor) ? "bg-chocolate-milk" : "bg-chocolate-light"} text-md rounded-lg px-4 py-2 text-white`}
                    >
                        <input
                            id={flavor}
                            type="checkbox"
                            value={flavor}
                            {...register("flavors", {
                                validate: (flavors) => (
                                    flavors.length > 0 ? true : "Flavor(s) required"
                                )
                            })}
                            className="hidden"
                        />
                        <span>{flavor}</span>
                    </label>
                ))}
            </div>
            {errors.flavors &&
                <p className="text-red-700 font-bold">{errors.flavors?.message}</p>
            }
        </div>
    )
}

export default ChocolateFlavorInputs