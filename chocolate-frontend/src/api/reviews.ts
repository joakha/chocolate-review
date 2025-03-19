import { Review } from "../types/types";
import { BASE_URL } from "../constants/constants";

const postReview = async (review: Review) => {
    try {
        const response = await fetch(`${BASE_URL}/api/reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(review) });

        if (!response.ok) {
            throw new Error("Error posting review in postReview!");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error posting review:", error);
    }
}

export {
    postReview
}