import { useReducer, ReactNode } from "react"
import { AppUser, AuthenticationContextType, AuthReducerActionType } from "../types/types"
import { AuthenticationContext } from "./AuthenticationContext"

type AuthenticationProviderProps = {
    children: ReactNode
}

const authReducerActions = {
    login: "login",
    loggedIn: "loggedIn"
}

export type AuthReducerActions = typeof authReducerActions;

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {

    type AuthStateType = {
        isAuthenticating: boolean,
        appUser: AppUser | null
    }

    const authReducer = (state: AuthStateType, action: AuthReducerActionType) => {
        switch (action.type) {
            case "login":
                return { ...state, isAuthenticating: true };
            case "loggedIn":
                return { ...state, isAuthenticating: false, appUser: action.payload || null }
            default:
                return state;
        }
    }

    const initAuthState = {
        isAuthenticating: false,
        appUser: null
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