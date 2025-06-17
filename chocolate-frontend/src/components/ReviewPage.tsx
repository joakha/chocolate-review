import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getReviewNoLogin } from "../api/review";
import { FaRegStar, FaStar } from "react-icons/fa";
import { scoreStrings } from "../constants";
import CommentForm from "./CommentForm";

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
            <div className="bg-chocolate-dark text-chocolate-white rounded-lg p-3 flex flex-col items-center gap-2">
                <div className={`grid grid-cols-1 lg:${review.pictureStrings.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                    {review.pictureStrings.map(picture => (
                        <div className="h-[300px]">
                            <img
                                className="rounded-md w-full h-full object-cover object-center"
                                src={picture}
                                alt={review.chocolate}
                            />
                        </div>
                    ))}
                </div>
                <h1 className="text-4xl font-bold">{review.title}</h1>
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                        {review.flavors.map(flavor => (
                            <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 text-center">
                                {flavor}
                            </div>
                        ))}
                </div>
                <div className="whitespace-pre-line">
                        {review.content}
                </div>
            </div>
            <div>
                <CommentForm reviewId={review._id} />
            </div>
        </div>
    )
}

export default ReviewPage