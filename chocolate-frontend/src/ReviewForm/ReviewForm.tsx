import { FormProvider, useForm } from "react-hook-form"
import { ReviewFormType } from "../types/types"
import ReviewDataInputs from "./ReviewDataInputs";

const ReviewForm = () => {
  const useFormMethods = useForm<ReviewFormType>();

  return (
    <FormProvider {...useFormMethods}>
      <form>
        <ReviewDataInputs />
      </form>
    </FormProvider>

  )
}

export default ReviewForm