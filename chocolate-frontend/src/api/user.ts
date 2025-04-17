import { RegisterInfoType } from "../types/types"
import { BACKEND_URL } from "../constants";

const registerUser = async (registerInfo: RegisterInfoType) => {
    const responseHeaders = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${BACKEND_URL}/api/appUsers/register`, {
        method: "POST",
        headers: responseHeaders,
        body: JSON.stringify(registerInfo)
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);
}

export {
    registerUser
}