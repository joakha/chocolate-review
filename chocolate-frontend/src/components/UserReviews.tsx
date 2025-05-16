import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getUserReviews } from "../api/review"

const UserReviews = () => {

    const { data: reviewData } = useQuery({
        queryKey: ["getUserReviews"],
        queryFn: getUserReviews,
    })

    return (
        <div className="space-y-5">
            <h2 className="text-4xl text-chocolate-milk font-bold text-center">Your Reviews</h2>
            <div className="flex justify-center">
                <Link
                    to={"/create-review"}
                    className="hover:cursor-pointer hover:bg-chocolate-milk rounded-md text-white flex items-center bg-chocolate-light p-3 font-bold"
                >
                    Create new Review
                </Link>
            </div>

        </div>
    )
}

export default UserReviews