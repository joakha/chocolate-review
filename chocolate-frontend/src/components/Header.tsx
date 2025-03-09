import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="w-full h-20 bg-chocolate-milk sticky top-0 flex items-center z-50 font-serif p-5">
            <section className="flex basis-1/6 justify-center">
                <Link to="/">
                    <article>Logo</article>
                </Link>
            </section>
            <section className="flex basis-4/6 justify-center gap-5">
                <Link to="/">
                    <article>Home</article>
                </Link>
                <article>About</article>
            </section>
            <section className="flex basis-1/6 justify-center gap-5">
                <article>Profile</article>
                <article>Logout</article>
            </section>
        </header>
    )
}

export default Header