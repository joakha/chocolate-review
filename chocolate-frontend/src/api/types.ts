import { BASE_URL } from "../constants/constants";

const fetchTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/types`);

        if (!response.ok) {
            throw new Error("Error fetching types in fetchTypes!");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error fetching types:", error);
    }
}

export {
    fetchTypes
}