import { useMutation, useQuery } from "@tanstack/react-query"
import ReviewForm from "../ReviewForm/ReviewForm"
import { updateReview } from "../api/review"
import { AuthNotification } from "../types/types"
import { useUser } from "../hooks/useUser"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getSpecificReview } from "../api/review"

export const EditReview = () => {

    const { updateNotification } = useUser();

    const { id } = useParams();

    const navigate = useNavigate();

    const { data: review, isError, error, isFetching } = useQuery({
        queryKey: ["getSpecificReview"],
        queryFn: () => getSpecificReview(id || ""),
        retry: false,
        enabled: !!id
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

    const reviewMutation = useMutation({
        mutationFn: updateReview,
        onSuccess: () => {
            const notificationMsg: AuthNotification = {
                msg: "Updated Your Review!",
                type: "SUCCESSFUL"
            };

            updateNotification(notificationMsg);
            navigate("/your-reviews");
        },
        onError: (error: Error) => {
            const notificationMsg: AuthNotification = {
                msg: error.message,
                type: "UNSUCCESSFUL"
            };

            updateNotification(notificationMsg);
        }
    })

    const saveReview = (reviewFormData: FormData) => {
        reviewMutation.mutate(reviewFormData);
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-4xl text-chocolate-milk font-bold text-center">Edit a Review</h2>
            {review ? (
                <ReviewForm review={review} saveReview={saveReview} isPending={reviewMutation.isPending} />
            ) : isFetching ? (
                <p className="text-center">Loading review...</p>
            ) : (
                <p className="text-center">No review found!</p>
            )}
        </div>
    )
}

export default EditReview