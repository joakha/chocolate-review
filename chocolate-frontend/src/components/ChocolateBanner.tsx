import bannerImage from "../assets/bannerimage.jpg"

const ChocolateBanner = () => {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-zinc-200">Chocolate Review App</div>
            </div>
            <img
                className="w-full h-[450px] object-cover"
                src={bannerImage}
            />
        </div>
    )
}

export default ChocolateBanner