import { Request, Response } from "express"
import ReviewModel from "../mongodb/review";

const findReviews = async (req: Request, res: Response) => {
    try {
        const reviewPerPage = 6;
        const selectedPage = parseInt(req.query.page ? req.query.page.toString() : "1");
        //depending on selected page, skip all reviews before that page
        const skipValue = (selectedPage - 1) * reviewPerPage;
        const reviews = await ReviewModel.find().skip(skipValue).limit(reviewPerPage);
        const reviewTotal = await ReviewModel.countDocuments();

        const response = {
            data: reviews,
            pagination: {
                reviewTotal,
                selectedPage,
                pageTotal: Math.ceil(reviewTotal / reviewPerPage)
            }
        };

        res.json(response);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Something went wrong!" });
    }
};