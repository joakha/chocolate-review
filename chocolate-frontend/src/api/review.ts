import { BACKEND_URL } from "../constants";

const createReview = async (reviewFormData: FormData) => {
    const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        credentials: "include",
        body: reviewFormData
    });

    if (!response.ok) {
        throw new Error("Creating review was unsuccessful");
    }

    return response.json();
}

export {
    createReview
}