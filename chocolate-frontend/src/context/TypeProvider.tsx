import TypeContext from "./TypeContext";
import { ProviderProps, TypeContextType, Type } from "../types/types";
import { useEffect, useState } from "react";
import { fetchTypes } from "../api/types";

const TypeProvider = ({ children }: ProviderProps) => {

    const [types, setTypes] = useState<Type[] | null>(null);
    const [loadingTypes, setLoadingTypes] = useState<boolean>(false);

    useEffect(() => {
        const getTypes = async () => {
            setLoadingTypes(true)
            try {
                const typesData = await fetchTypes();
                setTypes(typesData);
                setLoadingTypes(false);
            } catch (error) {
                console.error(error);
            }
        }

        getTypes();
    }, [])

    const TypeProviderValue: TypeContextType = {
        types,
        loadingTypes,
    }

    return (
        <TypeContext.Provider value={TypeProviderValue}>
            {children}
        </TypeContext.Provider>
    )
}

export default TypeProvider;