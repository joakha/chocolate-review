import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { LoginInfo } from "../types/types"
import { login } from "../api/authentication";
import useAuthentication from "../hooks/useAuthentication";

export const Login = () => {

  const { isAuthenticating, dispatch, appUser, authReducerActions } = useAuthentication();

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: authReducerActions.login });
    const userData = await login(loginInfo);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    setTimeout(() => {
      dispatch({ type: authReducerActions.loggedIn, payload: userData });
    }, 3000)
  }

  useEffect(() => {
    console.log(appUser)
  }, [appUser])

  return (
    <section className="flex flex-col m-10 items-center">
      <h1 className="font-bold text-3xl mb-10">Login</h1>
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
      {isAuthenticating && <div>authenticating...</div>}
    </section>
  )
}

export default Login