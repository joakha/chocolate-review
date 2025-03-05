const Header = () => {
    return (
        <header className="w-full h-20 bg-chocolate-dark sticky top-0 flex items-center z-50 font-serif">
            <section className="flex basis-1/6 justify-center">
                <article>Logo</article>
            </section>
            <section className="flex basis-4/6 justify-center gap-5">
                <article>Home</article>
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