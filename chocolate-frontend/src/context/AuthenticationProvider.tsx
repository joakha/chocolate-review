import { useReducer } from "react"
import { AppUser, AuthenticationContextType, AuthReducerActionType, ProviderProps } from "../types/types"
import AuthenticationContext from "./AuthenticationContext"

const authReducerActions = {
    register: "register",
    registered: "registered",
    login: "login",
    loggedIn: "loggedIn",
    logout: "logout"
}

export type AuthReducerActions = typeof authReducerActions;

const AuthenticationProvider = ({ children }: ProviderProps) => {

    type AuthStateType = {
        isAuthenticating: boolean,
        appUser: AppUser | null
    }

    const authReducer = (state: AuthStateType, action: AuthReducerActionType) => {
        switch (action.type) {
            case "register":
                return { ...state, isAuthenticating: true };
            case "registered":
                return { ...state, isAuthenticating: false, appUser: action.payload || null }
            case "login":
                return { ...state, isAuthenticating: true };
            case "loggedIn":
                return { ...state, isAuthenticating: false, appUser: action.payload || null }
            case "logout":
                return { ...state, isAuthenticating: false, appUser: null }
            default:
                return state;
        }
    }

    const initAuthState = {
        isAuthenticating: false,
        appUser: JSON.parse(`${sessionStorage.getItem("userData")}`) || null
    }

    const [state, dispatch] = useReducer(authReducer, initAuthState);

    const AuthenticationProviderValue: AuthenticationContextType = {
        isAuthenticating: state.isAuthenticating,
        appUser: state.appUser,
        dispatch,
        authReducerActions
    }

    return (
        <AuthenticationContext.Provider value={AuthenticationProviderValue}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider;