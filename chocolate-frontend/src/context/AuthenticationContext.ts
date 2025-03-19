import { createContext } from "react";
import { AuthenticationContextType } from "../types/types";

const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

export default AuthenticationContext