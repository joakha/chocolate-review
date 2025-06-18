import { FaRegStar, FaRegThumbsDown, FaRegThumbsUp, FaStar } from "react-icons/fa"
import { GiChocolateBar } from "react-icons/gi"
import { IoPricetagsOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { scoreStrings } from "../constants"
import { getFormattedFinnishDate } from "../lib/dateFunctions"
import { Review } from "../../../chocolate-backend/src/types/types"

const FindCard = ({ review }: { review: Review }) => {
    return (
        <div className="bg-chocolate-dark rounded-lg p-5 gap-10 flex flex-col">
            <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-10">
                <div className="grid grid-rows-[1fr_1fr_1fr_2fr] gap-5">
                    <Link to={`/full-review/${review._id}`} className="text-2xl text-white font-bold flex items-center cursor-pointer">
                        {review.title}
                    </Link>

                    <div className="text-white flex items-center">
                        Updated: <span className="text-chocolate-white">{getFormattedFinnishDate(review.editedAt)}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 items-center flex gap-2">
                            <GiChocolateBar /> {review.chocolate}
                        </div>

                        <div className="bg-chocolate-milk text-chocolate-white rounded-lg p-3 flex flex-col gap-2 items-center">
                            {review.recommended ? (
                                <>
                                    <FaRegThumbsUp />
                                    <span className="text-green-300">Recommended</span>
                                </>
                            ) : (
                                <>
                                    <FaRegThumbsDown />
                                    <span className="text-red-300">Avoid</span>
                                </>
                            )}
                        </div>

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

                        <div className="bg-chocolate-milk text-chocolate-white flex-col rounded-lg p-3 items-center flex gap-2">
                            <IoPricetagsOutline /> {review.price}€
                        </div>
                    </div>

                    <div className="line-clamp-4 text-chocolate-white">
                        {review.content}...
                    </div>
                </div>

                <div className="w-full h-full">
                    <img
                        className="w-full h-full object-cover object-center"
                        src={review.pictureStrings[0]}
                    />
                </div>
            </div>
            <div className="flex justify-start">
                <Link
                    to={`/full-review/${review._id}`}
                    className="hover:cursor-pointer hover:bg-chocolate-milk rounded-md text-white flex items-center bg-chocolate-light p-3 font-bold"
                >
                    Full Review
                </Link>
            </div>
        </div>

    )
}

export default FindCard