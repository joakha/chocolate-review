import { AuthReducerActions } from "../context/AuthenticationProvider"
import { ReactNode } from "react"

//types for authentication
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
    _id: string,
    username: string,
    email: string,
}

//types for review
export type Review = {
    title: string,
    content: string,
    image: string | null,
    poster: string,
    type: string
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

//types for type context and provider
export type Type = {
    _id: string,
    name: string
}

export type TypeContextType = {
    types: Type[] | null,
    loadingTypes: boolean,
}

//types for context providers
export type ProviderProps = {
    children: ReactNode,
}