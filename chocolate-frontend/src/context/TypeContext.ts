import { createContext } from "react";
import { TypeContextType } from "../types/types";

const TypeContext = createContext<TypeContextType | null>(null);

export default TypeContext