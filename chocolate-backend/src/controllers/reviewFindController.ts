import { Request, Response } from "express"
import ReviewModel from "../mongodb/review";
import { ReviewSearch } from "../types/types";

const findReviews = async (req: Request, res: Response) => {

    let findQuery: any = {};

    if (req.query.title) {
        findQuery.title = new RegExp(req.query.title as string, "i");
    }

    if (req.query.chocolate) {
        findQuery.chocolate = new RegExp(req.query.chocolate as string, "i");
    }

    //queried reviews include at least one flavor specified in query
    if (req.query.flavors) {
        findQuery.flavors = {
            $in: Array.isArray(req.query.flavors)
                ? req.query.flavors
                : [req.query.flavors],
        };
    }

    //queried reviews include at least one rating specified in query
    if (req.query.ratings) {
        findQuery.rating = {
            $in: Array.isArray(req.query.ratings)
                ? (req.query.ratings as string[]).map((rating: string) => parseInt(rating))
                : parseInt(req.query.ratings as string)
        };
    }

    if (req.query.price) {
        findQuery.price = {
            $lte: req.query.toString()
        }
    }

    try {
        const reviewPerPage = 2;
        const selectedPage = parseInt(req.query.selectedPage ? req.query.selectedPage.toString() : "1");
        //depending on selected page, skip all reviews before that page
        const skipValue = (selectedPage - 1) * reviewPerPage;
        const reviews = await ReviewModel.find(findQuery).skip(skipValue).limit(reviewPerPage);
        const reviewTotal = await ReviewModel.countDocuments(findQuery);

        const response: ReviewSearch = {
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

export {
    findReviews
}