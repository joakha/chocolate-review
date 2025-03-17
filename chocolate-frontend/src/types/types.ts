import { AuthReducerActions } from "../context/AuthenticationProvider"

//types for authentication, authentication context and provider
export type RegisterInfo = {
    email: string,
    username: string,
    password: string
}

export type LoginInfo = {
    username: string,
    password: string
}

export type AppUser = {
    username: string
}

//types for authentication context and provider
export type AuthReducerActionType = {
    type: string,
    payload?: AppUser
}

export type AuthenticationContextType = {
    isAuthenticating: boolean,
    appUser: AppUser | null,
    dispatch: React.ActionDispatch<[action: AuthReducerActionType]>
    authReducerActions: AuthReducerActions
}