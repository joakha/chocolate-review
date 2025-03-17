import { ChangeEvent, FormEvent, useState } from "react"
import { LoginInfo } from "../types/types"
import { login } from "../api/authentication";

export const Login = () => {

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responseData = await login(loginInfo)

    console.log(responseData);
  }

  return (
    <section className="flex m-10 justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input
          className="w-[50vw] p-4 rounded-xl text-black"
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <input className="w-[50vw] p-4 rounded-xl text-black"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          className="bg-chocolate-dark p-2 rounded-xl"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  )
}

export default Login