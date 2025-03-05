import chocolateImage from "../assets/chocolate1.jpg"

const Preview = () => {
    return (
        <article className="m-4 w-[350px] bg-chocolate-dark rounded-xl p-4">
            <img
                src={chocolateImage}
                className="w-[350px] h-[250px] object-cover rounded-xl"
            />
            <div className="flex items-center flex-col">
                <h3 className="font-bold text-2xl my-3">
                    Review Title
                </h3>
                <p className="my-3">
                    Review Types
                </p>
                <p className="text-justify">
                    From the moment you unwrap this chocolate,
                    the rich aroma of cocoa tantalizes your senses,
                    hinting at the indulgence to come. The first bite is a perfect balance of smooth,
                    velvety texture and deep, complex flavors. Notes of  flavors e.g. dark espresso, caramel,
                    or citrus zest dance on the palate, creating a truly luxurious taste experience.
                </p>
            </div>
        </article>
    )
}

export default Preview