import { RegisterInfoType } from "../types/types"
import { BACKEND_URL } from "../constants";

const registerUser = async (registerInfo: RegisterInfoType) => {
    const responseHeaders = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${BACKEND_URL}/api/appUsers/register`, {
        method: "POST",
        credentials: "include",
        headers: responseHeaders,
        body: JSON.stringify(registerInfo)
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);
}

const verifyJWT = async () => {
    const response = await fetch(`${BACKEND_URL}/api/appUsers/verify-jwt`, {
        credentials: "include",
    });

    if (!response.ok) throw new Error("Invalid JWT");

    return response.json();
}

export {
    registerUser,
    verifyJWT
}