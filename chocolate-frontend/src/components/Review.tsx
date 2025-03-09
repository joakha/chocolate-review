import chocolateImage from "../assets/chocolate1.jpg"

const Review = () => {
    return (
        <section className="basis-4/5 m-10">
            <img
                className="w-full object-cover h-[300px] rounded-xl"
                src={chocolateImage}
            />
            <article className="bg-chocolate-dark p-5 mt-5 rounded-xl">
                <h1 className="text-center font-bold m-5 text-4xl">Review Title</h1>
                <div className="flex justify-between">
                    <p>User</p>
                    <p>Date</p>
                </div>
                <div>
                    <p className="my-10 text-justify">
                        From the moment you unwrap this chocolate,
                        the rich aroma of cocoa tantalizes your senses,
                        hinting at the indulgence to come. The first bite is a perfect balance of smooth,
                        velvety texture and deep, complex flavors. Notes of  flavors e.g. dark espresso, caramel,
                        or citrus zest dance on the palate, creating a truly luxurious taste experience.
                    </p>
                </div>
            </article>
        </section>
    )
}

export default Review