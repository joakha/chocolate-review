import bannerImage from "../assets/bannerimage.jpg"

const Banner = () => {
    return (
        <section className="relative">
            <article className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Chocolate Review App</h1>
            </article>
            <img
                className="w-full h-[450px] object-cover"
                src={bannerImage}
            />
        </section>
    )
}

export default Banner