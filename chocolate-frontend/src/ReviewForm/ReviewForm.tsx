import { FormProvider, useForm } from "react-hook-form"
import { ReviewFormType } from "../types/types"
import ReviewDataInputs from "./ReviewDataInputs";

const ReviewForm = () => {
  const useFormMethods = useForm<ReviewFormType>({
    defaultValues: {
      recommended: false
    }
  });

  const { handleSubmit } = useFormMethods;

  const createReview = handleSubmit((review: ReviewFormType) => {
    console.log(review)
  })

  return (
    <FormProvider {...useFormMethods}>
      <form onSubmit={createReview} className="flex flex-col 4">
        <ReviewDataInputs />
        <div>
          <button type="submit" className="bg-chocolate-milk rounded-md mt-5 text-white p-2 font-bold text-2xl">
            Create Review
          </button>
        </div>
      </form>
    </FormProvider>

  )
}

export default ReviewForm