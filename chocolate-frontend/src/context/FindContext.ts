import { createContext } from "react";
import { findContextType } from "../types/types";

export const FindContext = createContext<findContextType | null>(null);