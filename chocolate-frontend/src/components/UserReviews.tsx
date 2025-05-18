import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getUserReviews } from "../api/review"
import { useEffect } from "react"
import { AuthNotification } from "../types/types"
import { useUser } from "../hooks/useUser"
import { GiChocolateBar } from "react-icons/gi";
import { FaRegThumbsDown, FaRegThumbsUp, FaRegStar, FaStar } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { getFormattedFinnishDate } from "../lib/dateFunctions"

const UserReviews = () => {

    const { updateNotification } = useUser();

    const { data: reviews, isError, error } = useQuery({
        queryKey: ["getUserReviews"],
        queryFn: getUserReviews,
        retry: false
    });

    useEffect(() => {
        if (isError) {
            const notificationMsg: AuthNotification = {
                msg: error.message,
                type: "UNSUCCESSFUL"
            };
            updateNotification(notificationMsg);
        }
    }, [isError]);

    const scoreStrings = {
        0: "Unbearable",
        1: "Poor",
        2: "Lacking",
        3: "Decent",
        4: "Good",
        5: "Great"
    };

    return (
        <div className="space-y-5">
            <h2 className="text-4xl text-chocolate-milk font-bold text-center">Your Reviews</h2>
            <div className="flex justify-center">
                <Link
                    to={"/create-review"}
                    className="hover:cursor-pointer hover:bg-chocolate-milk rounded-md text-white flex items-center bg-chocolate-light p-3 font-bold"
                >
                    Create New Review
                </Link>
            </div>
            <div className="flex flex-col justify-center">
                {reviews ? (
                    reviews.map((review) => (
                        <div key={review._id} className="flex flex-col rounded-lg bg-chocolate-dark p-5 mb-10 gap-10">
                            <h3 className="text-2xl text-white font-bold">{review.title}</h3>
                            <div className="text-white">Updated: <span className="text-chocolate-white">{getFormattedFinnishDate(review.editedAt)}</span></div>
                            <img className="w-1/4 border border-chocolate-light rounded-lg" src={review.pictures[0]} />
                            <div className="whitespace-pre-line text-chocolate-white">{review.content}</div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 items-center flex gap-2">
                                    <GiChocolateBar /> {review.chocolate}
                                </div>
                                <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 flex gap-2 items-center">
                                    {review.recommended ? (
                                        <>
                                            <FaRegThumbsUp />
                                            <span className="text-green-300">Recommended</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaRegThumbsDown />
                                            <span className="text-red-300">Not Recommended</span>
                                        </>
                                    )}
                                </div>
                                <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 flex items-center gap-2">
                                    {/* Array needs to be spread so values are actually undefined and so that map works */}
                                    {[...Array(5)].map((_, index) => (
                                        index < review.rating ? (
                                            <FaStar key={index} />
                                        ) : (
                                            <FaRegStar key={index} />
                                        )))}
                                        {scoreStrings[review.rating]}
                                </div>
                                <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 items-center flex gap-2">
                                    <IoPricetagsOutline /> {review.price}€
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <Link
                                    to={`/edit-review/${review._id}`}
                                    className="hover:cursor-pointer hover:bg-chocolate-milk rounded-md text-white flex items-center bg-chocolate-light p-3 font-bold"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No user reviews found!</div>
                )}
            </div>
        </div>
    )
}

export default UserReviews