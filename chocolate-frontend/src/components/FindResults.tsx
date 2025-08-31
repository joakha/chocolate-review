import { useQuery } from "@tanstack/react-query";
import { useFind } from "../hooks/useFind";
import { findReviews } from "../api/review";
import { ChangeEvent, useState } from "react";
import FindCard from "./FindCard";
import PaginationRow from "./PaginationRow";
import { Filters } from "./Filters";

const FindResults = () => {
    const find = useFind();

    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [filteredRatings, setFilteredRatings] = useState<string[]>([]);
    const [filteredFlavors, setFilteredFlavors] = useState<string[]>([]);
    const [filteredPrice, setFilteredPrice] = useState<number | undefined>();
    const [sort, setSort] = useState<string>()

    const filterRatings = (e: ChangeEvent<HTMLInputElement>) => {
        const rating = e.target.value;

        setFilteredRatings(prevFilteredRatings =>
            e.target.checked
                ? [...prevFilteredRatings, rating]
                : prevFilteredRatings.filter(arrayRating => arrayRating !== rating)
        );
    };

    const filterFlavors = (e: ChangeEvent<HTMLInputElement>) => {
        const flavor = e.target.value;

        setFilteredFlavors(prevFilteredFlavors =>
            e.target.checked
                ? [...prevFilteredFlavors, flavor]
                : prevFilteredFlavors.filter(arrayFlavor => arrayFlavor !== flavor)
        );
    };

    const options = {
        title: find.title,
        chocolate: find.chocolate,
        editedAt: find.editedAt.toISOString(),
        selectedPage: selectedPage.toString(),
        ratings: filteredRatings,
        flavors: filteredFlavors,
        price: filteredPrice?.toString(),
        sort
    };

    const { data: reviewsFindData } = useQuery({
        queryKey: ["findReviews", options],
        queryFn: () => findReviews(options)
    });

    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_350px] gap-5 text-white">
            <div className="flex rounded-xl flex-col items-center gap-5">
                <div className="flex w-full justify-between">
                    <span className="text-2xl font-bold text-chocolate-dark">
                        Found {reviewsFindData?.pagination.reviewTotal} reviews
                        {find.title ? ` with title "${find.title}"` : ""}
                    </span>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 text-black border rounded-md">
                        <option value="" className="text-gray-500">Sort</option>
                        <option value="Highest Rating">Highest Rating</option>
                        <option value="Lowest Rating">Lowest Rating</option>
                        <option value="Highest Price">Highest Price</option>
                        <option value="Lowest Price">Lowest Price</option>
                    </select>
                </div>
                {reviewsFindData?.data.map((review) => (
                    <FindCard
                        key={review._id}
                        review={review}
                    />
                ))}
                <div>
                    <PaginationRow
                        pageTotal={reviewsFindData?.pagination.pageTotal || 1}
                        selectedPage={reviewsFindData?.pagination.selectedPage || 1}
                        paginationChange={(selectedPage) => setSelectedPage(selectedPage)}
                    />
                </div>
            </div>
            <div className="bg-chocolate-dark flex justify-center rounded-xl mb-10 p-5 h-fit lg:sticky lg:top-10">
                <div>
                    <h2 className="text-lg font-semibold">Filter Reviews:</h2>
                    <Filters
                        filteredRatings={filteredRatings}
                        filterRatings={filterRatings}
                        filteredFlavors={filteredFlavors}
                        filterFlavors={filterFlavors}
                        filteredPrice={filteredPrice}
                        filterPrice={(value?: number) => setFilteredPrice(value)}
                    />
                </div>
            </div>
        </div>

    );
};

export default FindResults