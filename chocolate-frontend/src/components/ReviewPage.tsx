import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getReviewNoLogin } from "../api/review";
import { FaRegStar, FaStar } from "react-icons/fa";
import { scoreStrings } from "../constants";

const ReviewPage = () => {

    const { id } = useParams();

    const { data: review } = useQuery({
        queryKey: ["getReviewNoLogin"],
        queryFn: () => getReviewNoLogin(id || ""),
        retry: false,
        enabled: Boolean(id)
    })

    if (!review) {
        return (
            <div></div>
        )
    }

    return (

        <div className="space-y-6 ">
            <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 flex flex-col items-center gap-2">
                {/* Array needs to be spread so values are actually undefined and so that map works */}
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        index < review.rating ? (
                            <FaStar key={index} />
                        ) : (
                            <FaRegStar key={index} />
                        )))}
                </div>
                <div>{scoreStrings[review.rating]}</div>
            </div>
        </div>
    )
}

export default ReviewPage