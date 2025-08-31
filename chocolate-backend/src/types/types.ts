import { Types } from "mongoose"

type AppUser = {
    _id: string,
    username: string,
    email: string,
    password: string
}

type Review = {
    _id: string,
    appUserId: string,
    title: string,
    chocolate: string,
    content: string,
    recommended: boolean,
    rating: 0 | 1 | 2 | 3 | 4 | 5,
    flavors: string[],
    price: number,
    pictureStrings: string[],
    editedAt: Date
}

type ReviewSearch = {
    data: Review[],
    pagination: {
        reviewTotal: number,
        selectedPage: number,
        pageTotal: number
    }
}

type Comment = {
    content: string,
    commenterName: string,
    reviewId: Types.ObjectId
}

type CommentSearch = {
    data: Comment[],
    pagination: {
        commentTotal: number,
        selectedPage: number,
        pageTotal: number
    }
}

export type {
    AppUser,
    Review,
    ReviewSearch,
    Comment,
    CommentSearch
}