import { RegisterInfo, LoginInfo } from "../types/types"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const registerAppUser = async (registerInfo: RegisterInfo) => {
    try {
        const response = await fetch(`${BASE_URL}/api/appUsers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(registerInfo) });

        if (!response.ok) {
            throw new Error("Error creating new AppUser!");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error registering user", error);
    }
}

const login = async (loginInfo: LoginInfo) => {
    try {
        const response = await fetch(`${BASE_URL}/api/appUsers/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginInfo) });

        if (!response.ok) {
            throw new Error("Error creating new AppUser!");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error registering user", error);
    }
}

export {
    registerAppUser,
    login
}