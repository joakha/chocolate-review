import { FilterProps } from "../types/types";
import { flavors, ratingFilterOptions, priceFilterOptions } from "../constants";

export const Filters = ({
    filteredRatings,
    filterRatings,
    filterFlavors,
    filteredFlavors,
    filteredPrice,
    filterPrice
}: FilterProps) => {

    return (
        <>
            <div className="border-b border-slate-300 pb-5">
                <h3 className="text-md font-semibold mb-2">Based on given rating</h3>
                {ratingFilterOptions.map(option => (
                    <div className="flex justify-between" key={option}>
                        <label htmlFor={option}>{option}</label>
                        <input
                            id={option}
                            type="checkbox"
                            className="rounded"
                            value={option}
                            checked={filteredRatings.includes(option)}
                            onChange={filterRatings}
                        />
                    </div>
                ))}
            </div>

            <div className="border-b border-slate-300 pb-5">
                <h3 className="text-md font-semibold mb-2">Based on included flavors</h3>
                {flavors.map(option => (
                    <div className="flex justify-between" key={option}>
                        <label htmlFor={option}>{option}</label>
                        <input
                            id={option}
                            type="checkbox"
                            className="rounded"
                            value={option}
                            checked={filteredFlavors.includes(option)}
                            onChange={filterFlavors}
                        />
                    </div>
                ))}
            </div>

            <div className="border-b border-slate-300 pb-5">
                <h3 className="text-md font-semibold mb-2">Based on Price</h3>
                <select
                    value={filteredPrice}
                    onChange={(e) => filterPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                    className="text-black w-full"
                >
                    <option value="">Filter by price</option>
                    {priceFilterOptions.map(price => (
                        <option value={price} key={price}>{price}</option>
                    ))}
                </select>

            </div>
        </>
    )
}
