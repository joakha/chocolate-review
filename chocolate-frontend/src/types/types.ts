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

//types for contexts
type ProviderProps = {
    children: ReactNode
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
    pictureStrings: string[]
}

type ReviewFormProps = {
    isPending: boolean,
    saveReview: (reviewFormData: FormData) => void,
    review?: Review
}

//types for FindContext
type findContextType = {
    title: string,
    chocolate: string,
    editedAt: Date,
    reviewId: string,
    saveFindCriteria: (title: string, chocolate: string, editedAt: Date) => void
}

export type {
    RegisterInfoType,
    AuthNotification,
    UserContextType,
    ProviderProps,
    LoginInfoType,
    ReviewFormType,
    ReviewFormProps,
    findContextType
}
