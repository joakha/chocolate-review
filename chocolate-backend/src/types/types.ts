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
    rating: number,
    flavors: string[],
    price: number,
    pictures: string[],
    editedAt: Date
}

export type {
    AppUser,
    Review
}