import { useForm } from "react-hook-form"
import { RegisterInfoType, AuthNotification } from "../types/types";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { registerUser } from "../api/user";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {

    const { updateNotification } = useUser();

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterInfoType>();

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["verifyJWT"] });
            const notificationMsg: AuthNotification = {
                msg: "Registered successfully!",
                type: "SUCCESSFUL"
            };

            updateNotification(notificationMsg);
            navigate("/");
        },
        onError: (error: Error) => {
            const notificationMsg: AuthNotification = {
                msg: error.message,
                type: "UNSUCCESSFUL"
            };

            updateNotification(notificationMsg);
        }
    });

    const submitForm = handleSubmit((registerInfo) => {
        registerMutation.mutate(registerInfo);
    })

    return (
        <form onSubmit={submitForm} className="flex flex-col gap-5">
            <h2 className="text-4xl text-chocolate-milk font-bold text-center">Register</h2>

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
                <label htmlFor="username" className="text-chocolate-light text-2xl font-bold">Username</label>
                <input
                    {...register("username", { required: "Username is required" })}
                    id="username"
                    className="border rounded w-full py-1 px-2"
                />
                {errors.username &&
                    <p className="text-red-700 font-bold">{errors.username?.message}</p>
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

            <div>
                <label htmlFor="repeatPassword" className="text-chocolate-light text-2xl font-bold">Repeat Password</label>
                <input
                    type="password"
                    {...register("repeatPassword", {
                        validate: (repeatPassword) => {
                            if (!repeatPassword) return "Please repeat you password"
                            if (watch("password") !== repeatPassword) return "Passwords don't match"
                        }
                    })}
                    id="repeatPassword"
                    className="border rounded w-full py-1 px-2"
                />
                {errors.repeatPassword &&
                    <p className="text-red-700 font-bold">{errors.repeatPassword?.message}</p>
                }
            </div>

            <div className="flex items-center justify-between">
                <button type="submit" className="bg-chocolate-milk rounded-md text-white p-2 font-bold text-2xl">
                    Register
                </button>
                <span
                    className="text-lg"
                    onClick={() => navigate("/login")}
                >
                    Already a user? <span className="underline hover:cursor-pointer">Login here</span>
                </span>
            </div>
        </form>
    )
}

export default RegisterUser