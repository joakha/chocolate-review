import { ChangeEvent, FormEvent, useState } from "react"
import useTypes from "../hooks/useTypes"
import useAuthentication from "../hooks/useAuthentication";
import { Review } from "../types/types";
import { postReview } from "../api/reviews";

const Create = () => {

    const { types, loadingTypes } = useTypes();
    const { appUser } = useAuthentication();

    const [review, setReview] = useState<Review>({
        title: "",
        content: "",
        image: "",
        poster: appUser?.username || "",
        type: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log(review)
        e.preventDefault();
        try {
            const responseData = await postReview(review);
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="basis-4/5 m-10">
            {loadingTypes ? (
                <div className="text-center">Loading...</div>
            ) : (
                <article>
                    <h1 className="text-center text-4xl font-bold mb-10">Create a New Review</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center mb-5">
                            <input
                                className="w-[70vw] p-4 rounded-xl text-black"
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={handleChange}
                                value={review.title}
                            />
                            <textarea
                                className="w-[70vw] h-[450px] mt-5 p-4 text-black rounded-xl"
                                placeholder="Content"
                                name="content"
                                onChange={handleChange}
                                value={review.content}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <select
                                value={review.type}
                                onChange={handleChange}
                                name="type"
                                className="mb-5"
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Select type of chocolate
                                </option>
                                {types?.map(type =>
                                    <option
                                        key={type._id}
                                        value={type._id}
                                    >
                                        {type.name}
                                    </option>)}
                            </select>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </article>
            )}
        </section>
    )
}

export default Create