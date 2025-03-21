import { RegisterInfo, LoginInfo } from "../types/types"
import { BASE_URL } from "../constants/constants";

const registerAppUser = async (registerInfo: RegisterInfo) => {
    try {
        const response = await fetch(`${BASE_URL}/api/appUsers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(registerInfo) });

        if (!response.ok) {
            throw new Error("Error registering user in registerAppUser!");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

const login = async (loginInfo: LoginInfo) => {
    try {
        const response = await fetch(`${BASE_URL}/api/appUsers/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginInfo) });

        if (!response.ok) {
            throw new Error("Error in login!");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error logging user in:", error);
        return null;
    }
}

export {
    registerAppUser,
    login
}