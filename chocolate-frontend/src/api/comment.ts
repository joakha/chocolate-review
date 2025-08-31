import { BACKEND_URL } from "../constants";
import { CommentFormType } from "../types/types";
import { CommentSearch } from "../../../chocolate-backend/src/types/types";

const createComment = async (commentFormData: CommentFormType) => {

    const responseHeaders = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${BACKEND_URL}/api/comments/postComment`, {
        method: "POST",
        credentials: "include",
        headers: responseHeaders,
        body: JSON.stringify(commentFormData)
    });

    if (!response.ok) {
        throw new Error("Creating comment was unsuccessful");
    }

    return response.json();
}

const getComments = async (reviewId: string, selectedPage: string): Promise<CommentSearch> => {
    const params = new URLSearchParams();
    params.append("selectedPage", selectedPage || "");

    const response = await fetch(`${BACKEND_URL}/api/comments/${reviewId}?${params}`);

    if (!response.ok) throw new Error("Error finding reviews!");

    return response.json();
}


export {
    createComment,
    getComments
}