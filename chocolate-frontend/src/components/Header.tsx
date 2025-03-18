import { Link } from "react-router-dom"
import useAuthentication from "../hooks/useAuthentication"

const Header = () => {

    const { appUser, dispatch, authReducerActions } = useAuthentication();

    const handleLogout = () => {
        sessionStorage.removeItem("userData");
        dispatch({type: authReducerActions.logout});
    }

    return (
        <header className="w-full h-20 bg-chocolate-milk sticky top-0 flex items-center z-50 font-bold p-5">
            <section className="flex basis-1/6 justify-center">
                <Link to="/">
                    <article>Logo</article>
                </Link>
            </section>
            <section className="flex basis-4/6 justify-center gap-5">
                <Link to="/">
                    <article>Home</article>
                </Link>
            </section>
            <section className="flex basis-1/6 justify-center gap-5">
                {appUser ? (
                    <>
                        <article>{appUser.username}</article>
                        <article onClick={handleLogout}>Logout</article>
                    </>
                ) : (
                    <>
                        <Link to="/register">
                            <article>Register</article>
                        </Link>
                        <Link to="/login">
                            <article>Login</article>
                        </Link>
                    </>
                )}
            </section>
        </header>
    )
}

export default Header