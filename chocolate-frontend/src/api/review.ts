import { BACKEND_URL } from "../constants";
import { Review, ReviewSearch } from "../../../chocolate-backend/src/types/types";
import { FindOptions } from "../types/types";

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

const getSpecificReview = async (reviewId: string): Promise<Review> => {
    const response = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error getting review!");
    }

    return response.json();
};

const updateReview = async (reviewFormData: FormData) => {
    const response = await fetch(`${BACKEND_URL}/api/reviews/${reviewFormData.get("_id")}`, {
        method: "PUT",
        credentials: "include",
        body: reviewFormData
    });

    if (!response.ok) {
        throw new Error("Updating review was unsuccessful");
    }

    return response.json();
}

const findReviews = async (options: FindOptions): Promise<ReviewSearch> => {
    const params = new URLSearchParams();
    params.append("title", options.title || "");
    params.append("chocolate", options.chocolate || "");
    params.append("editedAt", options.editedAt || "");
    params.append("selectedPage", options.selectedPage || "");
    params.append("price", options.price || "");
    params.append("sort", options.sort || "");

    options.flavors?.forEach(flavor => {
        params.append("flavors", flavor);
    })

    options.ratings?.forEach(rating => {
        params.append("ratings", rating);
    })

    const response = await fetch(`${BACKEND_URL}/api/find-reviews/find?${params}`);

    if (!response.ok) throw new Error("Error finding reviews!");

    return response.json();
}

export {
    createReview,
    getUserReviews,
    getSpecificReview,
    updateReview,
    findReviews
}