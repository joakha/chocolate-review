import { useForm } from "react-hook-form"
import { LoginInfoType } from "../types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginUser } from "../api/user"
import { useUser } from "../hooks/useUser"
import { AuthNotification } from "../types/types"
import { useNavigate } from "react-router-dom"

export const LoginUser = () => {

  const { register, formState: { errors }, handleSubmit } = useForm<LoginInfoType>()

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { updateNotification } = useUser();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verifyJWT"] });
      const notificationMsg: AuthNotification = {
        msg: "Login successful!",
        type: "SUCCESSFUL"
      }

      updateNotification(notificationMsg);
      navigate("/");
    },
    onError: (error: Error) => {
      const notificationMsg: AuthNotification = {
        msg: error.message,
        type: "UNSUCCESSFUL"
      }

      updateNotification(notificationMsg);
    }
  })

  const submitForm = handleSubmit(loginInfo => {
    loginMutation.mutate(loginInfo);
  })

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-5">
      <h2 className="text-4xl text-chocolate-milk font-bold text-center">Login</h2>

      <div>
        <label htmlFor="email" className="text-chocolate-light text-2xl font-bold">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          id="email"
          className="border rounded w-full py-1 px-2"
        />
        {errors.email &&
          <p className="text-red-700 font-bold">{errors.email?.message}</p>
        }
      </div>

      <div>
        <label htmlFor="password" className="text-chocolate-light text-2xl font-bold">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password length should be 8 or more characters"
            }
          })}
          id="password"
          className="border rounded w-full py-1 px-2"
        />
        {errors.password &&
          <p className="text-red-700 font-bold">{errors.password?.message}</p>
        }
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-chocolate-milk rounded-md text-white p-2 font-bold text-2xl">
          Login
        </button>
        <span
          className="text-lg"
        >
          No account? <span onClick={() => navigate("/register")} className="underline hover:cursor-pointer">Register here</span>
        </span>
      </div>
    </form>
  )
}

export default LoginUser