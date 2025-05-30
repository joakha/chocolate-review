import { FindContext } from "./FindContext";
import { ProviderProps } from "../types/types";
import { useState } from "react";

export const FindProvider = ({ children }: ProviderProps) => {

    const [title, setTitle] = useState<string>("");
    const [chocolate, setChocolate] = useState<string>("");
    const [editedAt, setEditedAt] = useState<Date>(new Date());
    const [reviewId, setReviewId] = useState<string>("");

    const saveFindCriteria = (title: string, chocolate: string, editedAt: Date, reviewId?: string) => {
        setTitle(title);
        setChocolate(chocolate);
        setEditedAt(editedAt)
        if (reviewId) {
            setReviewId(reviewId)
        }
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
