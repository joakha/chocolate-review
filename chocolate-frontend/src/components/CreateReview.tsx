import { useMutation } from "@tanstack/react-query"
import ReviewForm from "../ReviewForm/ReviewForm"
import { createReview } from "../api/review"
import { AuthNotification } from "../types/types"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"

export const CreateReview = () => {

  const { updateNotification } = useUser()

  const navigate = useNavigate();

  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: async () => {
      const notificationMsg: AuthNotification = {
        msg: "Created Your Review!",
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
      <h2 className="text-4xl text-chocolate-milk font-bold text-center">Create a Review</h2>
      <ReviewForm saveReview={saveReview} isPending={reviewMutation.isPending} />
    </div>
  )
}

export default CreateReview