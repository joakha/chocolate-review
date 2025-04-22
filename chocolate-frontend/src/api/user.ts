import { RegisterInfoType, LoginInfoType } from "../types/types"
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

const loginUser = async (loginInfo: LoginInfoType) => {
    const responseHeaders = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${BACKEND_URL}/api/appUsers/login`, {
        method: "POST",
        credentials: "include",
        headers: responseHeaders,
        body: JSON.stringify(loginInfo)
    });

    const responseBody = await response.json();

    if (!response.ok) throw new Error(responseBody.message);

    return responseBody;
}

const logoutUser = async () => {
    const response = await fetch(`${BACKEND_URL}/api/appUsers/logout`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) throw new Error("Error logging out");
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
    verifyJWT,
    loginUser,
    logoutUser
}