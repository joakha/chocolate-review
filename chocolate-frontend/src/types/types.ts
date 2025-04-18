import { ReactNode } from "react"

//registration form types
type RegisterInfoType = {
    username: string,
    email: string,
    password: string,
    repeatPassword: string
}

//types for UserContext
type AuthNotification = {
    msg: string,
    type: "SUCCESSFUL" | "UNSUCCESSFUL"
}

type UserContextType = {
    updateNotification: (msg: AuthNotification) => void,
    closeNotification: () => void,
    notificationMsg: AuthNotification | null,
    loggedIn: boolean
}

type UserProviderType = {
    children: ReactNode
}

export type {
    RegisterInfoType,
    AuthNotification,
    UserContextType,
    UserProviderType,
}
