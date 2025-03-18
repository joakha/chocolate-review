import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { RegisterInfo } from "../types/types"
import { registerAppUser } from "../api/authentication";
import useAuthentication from "../hooks/useAuthentication";

export const Register = () => {

  const { isAuthenticating, dispatch, appUser, authReducerActions } = useAuthentication();

  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: authReducerActions.register });
    const responseData = await registerAppUser(registerInfo);
    setTimeout(() => {
      dispatch({ type: authReducerActions.registered, payload: responseData });
    }, 3000)
  }

  useEffect(() => {
    console.log(appUser)
  }, [appUser])

  return (
    <section className="flex flex-col m-10 items-center">
      <h1 className="font-bold text-3xl mb-10">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input className="w-[50vw] p-4 rounded-xl text-black"
          name="email" type="email"
          placeholder="Email"
          onChange={handleChange}
        />
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
          Register
        </button>
      </form>
      {isAuthenticating && <div>authenticating...</div>}
    </section>
  )
}

export default Register