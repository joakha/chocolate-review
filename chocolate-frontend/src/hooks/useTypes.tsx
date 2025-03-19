import TypeContext from "../context/TypeContext";
import { useContext } from "react";

const useTypes = () => {
    const context = useContext(TypeContext);

    if (!context) {
        throw new Error("Use this hook within the TypeProvider component!")
    }

    return context;
}

export default useTypes;