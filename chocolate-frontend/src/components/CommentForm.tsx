import { AuthNotification, CommentFormProps, CommentFormType } from "../types/types"
import { useForm } from "react-hook-form"
import { getAppUserInfo } from "../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { createComment } from "../api/comment";

const CommentForm = ({ reviewId }: CommentFormProps) => {

  const { updateNotification } = useUser();

  const queryClient = useQueryClient();

  const { data: appUserInfo } = useQuery({
    queryKey: ["getAppUserInfo"],
    queryFn: getAppUserInfo,
  })

  const { register, formState: { errors }, handleSubmit, setValue } = useForm<CommentFormType>();

  useEffect(() => {
    setValue("commenterName", appUserInfo?.username || "");
    setValue("reviewId", reviewId || "");
  }, [appUserInfo, reviewId])

  const commentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getComments"] });
      const notificationMsg: AuthNotification = {
        msg: "Created Your Comment!",
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

  const submitComment = handleSubmit(commentFormData => {
    commentMutation.mutate(commentFormData);
  })

  return (
    <form onSubmit={submitComment} className="flex flex-col gap-4 w-full">
      <div className="text-chocolate-light font-bold text-xl">{appUserInfo?.username} says:</div>
      <div className="w-full">
        <label htmlFor="comment" className="text-chocolate-light text-2xl font-bold">Write a Comment</label>
        <textarea
          rows={10}
          {...register("content", { required: "Comment is required" })}
          id="comment"
          className="border rounded w-full py-1 px-2"
        />
        {errors.content &&
          <p className="text-red-700 font-bold">{errors.content?.message}</p>
        }
      </div>
      <div>
        <button
          type="submit"
          className="bg-chocolate-milk rounded-md text-white p-2 font-bold text-2xl"
          disabled={commentMutation.isPending}
        >
          {commentMutation.isPending ? "Creating Comment" : "Create Comment"}
        </button>
      </div>
    </form>
  )
}

export default CommentForm