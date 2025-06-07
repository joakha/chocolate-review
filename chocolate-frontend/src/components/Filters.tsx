import { FilterProps } from "../types/types";

export const Filters = ({ filteredRatings, selectFilter }: FilterProps) => {

    const ratingFilterOptions = ["5", "4", "3", "2", "1"];

    return (
        <div className="border-b border-slate-300 pb-5">
            <h3 className="text-md font-semibold mb-2">Based on given rating</h3>
            {ratingFilterOptions.map(option => (
                <div className="flex justify-between" key={option}>
                    <label htmlFor={option}>{option}</label>
                    <input
                        type="checkbox"
                        className="rounded"
                        value={option}
                        checked={filteredRatings.includes(option)}
                        onChange={selectFilter}
                    />
                </div>
            ))}
        </div>
    )
}
