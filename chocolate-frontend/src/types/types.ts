import { ReactNode } from "react"
import { Review } from "../../../chocolate-backend/src/types/types"

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

type ReviewFormProps = {
    isPending: boolean,
    saveReview: (reviewFormData: FormData) => void,
    review?: Review
}

export type {
    RegisterInfoType,
    AuthNotification,
    UserContextType,
    UserProviderType,
    LoginInfoType,
    ReviewFormType,
    ReviewFormProps,
}
