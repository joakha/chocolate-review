import AuthenticationContext from "../context/AuthenticationContext";
import { useContext } from "react";

const useAuthentication = () => {
    const context = useContext(AuthenticationContext);

    if (!context) {
        throw new Error("Use this hook within the AuthenticationProvider component!")
    }

    return context;
}

export default useAuthentication;