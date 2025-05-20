import { FormProvider, useForm } from "react-hook-form"
import { ReviewFormType } from "../types/types"
import ReviewDataInputs from "./ReviewDataInputs";
import { ReviewFormProps } from "../types/types"
import { useEffect } from "react";

const ReviewForm = ({ saveReview, isPending, review }: ReviewFormProps) => {
  const useFormMethods = useForm<ReviewFormType>({
    defaultValues: {
      recommended: false
    }
  });

  const { handleSubmit, reset } = useFormMethods;

  useEffect(() => {
    if (review) {
      const { pictures, ...rest } = review;
      reset({ ...rest, pictures: undefined });
    }
  }, [review, reset])

  const createReview = handleSubmit((review: ReviewFormType) => {
    const reviewFormData = new FormData();
    reviewFormData.append("title", review.title);
    reviewFormData.append("chocolate", review.chocolate);
    reviewFormData.append("content", review.content);
    reviewFormData.append("recommended", review.recommended.toString());
    reviewFormData.append("rating", review.rating.toString());
    reviewFormData.append("price", review.price.toString());

    review.flavors.forEach((flavor, i) => {
      reviewFormData.append(`flavors[${i}]`, flavor)
    });

    Array.from(review.pictures).forEach((picture) => {
      reviewFormData.append("pictures", picture);
    })

    saveReview(reviewFormData);
  });

  return (
    <FormProvider {...useFormMethods}>
      <form onSubmit={createReview} className="flex flex-col 4">
        <ReviewDataInputs />
        <div>
          <button
            type="submit"
            className="bg-chocolate-milk rounded-md mt-5 text-white p-2 font-bold text-2xl disabled:bg-chocolate-dark"
            disabled={isPending}
          >
            {isPending ? "Creating Review" : "Create Review"}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ReviewForm