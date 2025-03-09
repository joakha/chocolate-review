import chocolateImage from "../assets/chocolate2.jpg"

const Typebar = () => {
    return (
        <section className="flex basis-1/5 justify-center">
            <article className="flex w-[400px] h-[578px] flex-col items-center bg-orange-950 m-10 rounded-xl">
                <img
                    className="w-full h-[250px] object-cover rounded-xl"
                    src={chocolateImage}
                />
                <h2 className="font-bold text-3xl p-4">Review Types</h2>
                <ul className="flex flex-col items-center">
                    <li className="p-2 text-xl font-medium">Brown Chocolate</li>
                    <li className="p-2 text-xl font-medium">White Chocolate</li>
                    <li className="p-2 text-xl font-medium">Dark Chocolate</li>
                    <li className="p-2 text-xl font-medium">Ruby Chocolate</li>
                </ul>
            </article>

        </section>
    )
}

export default Typebar