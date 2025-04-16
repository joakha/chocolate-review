import { RegisterInfo } from "../types/types"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const registerAppUser = async (registerInfo: RegisterInfo) => {
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
    registerAppUser
}