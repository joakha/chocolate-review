import bannerImage from "../assets/bannerimage.jpg"

const Banner = () => {
    return (
        <div className="pb-5 relative">
            <img
                className="w-full h-[175px] object-cover"
                src={bannerImage}
                alt="Banner"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">
                    Write about your favorite chocolate!
                </h1>
            </div>
        </div>
    )
}

export default Banner