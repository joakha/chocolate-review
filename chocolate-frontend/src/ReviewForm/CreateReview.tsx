import { useMutation } from "@tanstack/react-query"
import ReviewForm from "./ReviewForm"
import { createReview } from "../api/review"
import { AuthNotification } from "../types/types"
import { useUser } from "../hooks/useUser"

export const CreateReview = () => {

  const { updateNotification } = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: createReview,
    onSuccess: async () => {
      const notificationMsg: AuthNotification = {
        msg: "Created Your Review!",
        type: "SUCCESSFUL"
      };

      updateNotification(notificationMsg);
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
    mutate(reviewFormData)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl text-chocolate-milk font-bold text-center">Create a Review</h2>
      <ReviewForm saveReview={saveReview} isPending={isPending} />
    </div>
  )
}

export default CreateReview