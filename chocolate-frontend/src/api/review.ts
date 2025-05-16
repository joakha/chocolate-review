import { BACKEND_URL } from "../constants";
import { Review } from "../../../chocolate-backend/src/types/types";

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

const getUserReviews = async (): Promise<Review[]> => {
    const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error getting reviews!");
    }

    return response.json();
};

export {
    createReview,
    getUserReviews
}