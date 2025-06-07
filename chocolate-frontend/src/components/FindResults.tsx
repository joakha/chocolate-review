import { useQuery } from "@tanstack/react-query";
import { useFind } from "../hooks/useFind";
import { findReviews } from "../api/review";
import { ChangeEvent, useState } from "react";
import FindCard from "./FindCard";
import FindResultsPagination from "./FindResultsPagination";
import { Filters } from "./Filters";

const FindResults = () => {
    const find = useFind();

    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [filteredRatings, setFilteredRatings] = useState<string[]>([]);

    const filterRatings = (e: ChangeEvent<HTMLInputElement>) => {
        const rating = e.target.value;

        setFilteredRatings(prevFilteredRatings => 
            e.target.checked 
            ? [...prevFilteredRatings, rating]
            : prevFilteredRatings.filter(arrayRating => arrayRating !== rating)
        );
    };

    const options = {
        title: find.title,
        chocolate: find.chocolate,
        editedAt: find.editedAt.toISOString(),
        selectedPage: selectedPage.toString()
    };

    const { data: reviewsFindData } = useQuery({
        queryKey: ["findReviews", options],
        queryFn: () => findReviews(options)
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-5 text-white">
            <div className="flex rounded-xl flex-col items-center gap-5">
                <div className="flex justify-between p-5">
                    <span className="text-2xl font-bold text-chocolate-dark">
                        Found {reviewsFindData?.pagination.reviewTotal} reviews
                        {find.title ? ` with title "${find.title}"` : ""}
                    </span>
                </div>
                {reviewsFindData?.data.map(review => (
                    <FindCard review={review} />
                ))}
                <div>
                    <FindResultsPagination
                        pageTotal={reviewsFindData?.pagination.pageTotal || 1}
                        selectedPage={reviewsFindData?.pagination.selectedPage || 1}
                        paginationChange={(selectedPage) => setSelectedPage(selectedPage)}
                    />
                </div>
            </div>
            <div className="bg-chocolate-dark flex justify-center rounded-xl p-5 h-fit sticky top-10">
                <div>
                    <h2 className="text-lg font-semibold">Filter Reviews:</h2>
                    <Filters filteredRatings={filteredRatings} />
                </div>
            </div>
        </div>

    );
};

export default FindResults