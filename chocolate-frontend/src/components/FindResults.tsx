import { useQuery } from "@tanstack/react-query";
import { useFind } from "../hooks/useFind";
import { findReviews } from "../api/review";

const FindResults = () => {
    const find = useFind();

    const options = {
        title: find.title,
        chocolate: find.chocolate,
        editedAt: find.editedAt.toString()
    }

    const { data: reviewsFindData } = useQuery({
        queryKey: ["findReviews", options],
        queryFn: () => findReviews(options)
    })

    return (
        <div>FindResults</div>

    )
}

export default FindResults