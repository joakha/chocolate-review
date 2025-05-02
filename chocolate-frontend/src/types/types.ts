import { ReactNode } from "react"

//registration form types
type RegisterInfoType = {
    username: string,
    email: string,
    password: string,
    repeatPassword: string
}

//login form types
type LoginInfoType = {
    email: string,
    password: string
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

//review form types
type ReviewFormType = {
    title: string,
    chocolate: string,
    content: string,
    recommended: boolean,
    rating: number,
    flavors: string[],
    price: number,
    pictures: FileList,
}

export type {
    RegisterInfoType,
    AuthNotification,
    UserContextType,
    UserProviderType,
    LoginInfoType,
    ReviewFormType
}
