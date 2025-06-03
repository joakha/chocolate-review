import { FaRegStar, FaRegThumbsDown, FaRegThumbsUp, FaStar } from "react-icons/fa"
import { GiChocolateBar } from "react-icons/gi"
import { IoPricetagsOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { scoreStrings } from "../constants"
import { getFormattedFinnishDate } from "../lib/dateFunctions"
import { Review } from "../../../chocolate-backend/src/types/types"

const FindCard = ({ review }: { review: Review }) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] bg-chocolate-dark rounded-lg p-5 mb-10 gap-10">
            <div className="flex flex-col">

            </div>
            <div className="w-full h-[300px]">
                <img
                    className="w-full h-full object-cover object-center"
                    src={review.pictureStrings[0]}
                />
            </div>
        </div>
    )
}

export default FindCard