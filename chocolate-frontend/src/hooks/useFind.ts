import { useContext } from "react";
import { FindContext } from "../context/FindContext";

export const useFind = () => {
    const context = useContext(FindContext);

    if (!context) throw new Error("Use this hook only within FindProvider.tsx!");

    return context;
}