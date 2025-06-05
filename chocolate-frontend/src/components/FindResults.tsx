import { useQuery } from "@tanstack/react-query";
import { useFind } from "../hooks/useFind";
import { findReviews } from "../api/review";
import { useState } from "react";
import FindCard from "./FindCard";

const FindResults = () => {
    const find = useFind();

    const [selectedPage, setSelectedPage] = useState<number>(1);

    const options = {
        title: find.title,
        chocolate: find.chocolate,
        editedAt: find.editedAt.toISOString(),
        selectedPage: selectedPage.toString()
    }

    const { data: reviewsFindData } = useQuery({
        queryKey: ["findReviews", options],
        queryFn: () => findReviews(options)
    })

    console.log(reviewsFindData)

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
            </div>
            <div className="bg-chocolate-dark flex justify-center rounded-xl p-5 h-fit sticky top-10">
                <div>
                    <h2 className="text-lg font-semibold">Filter Reviews:</h2>
                </div>
            </div>
        </div>

    )
}

export default FindResults