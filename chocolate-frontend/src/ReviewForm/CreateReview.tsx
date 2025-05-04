import ReviewForm from "./ReviewForm"

export const CreateReview = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl text-chocolate-milk font-bold text-center">Create a Review</h2>
      <ReviewForm />
    </div>
  )
}

export default CreateReview