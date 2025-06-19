import { FindContext } from "./FindContext";
import { ProviderProps } from "../types/types";
import { useState } from "react";

export const FindProvider = ({ children }: ProviderProps) => {

    const [title, setTitle] = useState<string>(sessionStorage.getItem("title") || "");
    const [chocolate, setChocolate] = useState<string>(sessionStorage.getItem("chocolate") || "");
    const [editedAt, setEditedAt] = useState<Date>(new Date(sessionStorage.getItem("editedAt") || new Date().toISOString()));
    const [reviewId, setReviewId] = useState<string>("");

    const saveFindCriteria = (title: string, chocolate: string, editedAt: Date, reviewId?: string) => {
        setTitle(title);
        setChocolate(chocolate);
        setEditedAt(editedAt)
        if (reviewId) {
            setReviewId(reviewId)
            sessionStorage.setItem("reviewId", reviewId)
        }

        sessionStorage.setItem("title", title);
        sessionStorage.setItem("chocolate", chocolate);
        sessionStorage.setItem("editedAt", editedAt.toISOString());
    };

    const providerValue = {
        title,
        chocolate,
        editedAt,
        reviewId,
        saveFindCriteria
    }

    return (
        <FindContext.Provider value={providerValue}>
            {children}
        </FindContext.Provider>
    );
}
