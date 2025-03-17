import { createContext } from "react";
import { AuthenticationContextType } from "../types/types";

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null);