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
    reset(review);
  }, [review, reset])

  const createReview = handleSubmit((reviewData: ReviewFormType) => {
    const reviewFormData = new FormData();
    if (review) reviewFormData.append("_id", review._id);
    reviewFormData.append("title", reviewData.title);
    reviewFormData.append("chocolate", reviewData.chocolate);
    reviewFormData.append("content", reviewData.content);
    reviewFormData.append("recommended", reviewData.recommended.toString());
    reviewFormData.append("rating", reviewData.rating.toString());
    reviewFormData.append("price", reviewData.price.toString());

    reviewData.flavors.forEach((flavor, i) => {
      reviewFormData.append(`flavors[${i}]`, flavor)
    });

    if (reviewData.pictureStrings) {
      reviewData.pictureStrings.forEach((pictureString, i) => {
        reviewFormData.append(`pictureStrings[${i}]`, pictureString);
      })
    }

    if (reviewData.pictures) {
      Array.from(reviewData.pictures).forEach((picture) => {
        reviewFormData.append("pictures", picture);
      })
    }

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