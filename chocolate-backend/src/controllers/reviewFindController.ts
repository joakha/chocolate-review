import { Request, Response } from "express"
import ReviewModel from "../mongodb/review";
import { ReviewSearch } from "../types/types";
import { validationResult } from "express-validator";

const findReviewById = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.array() });
    
    const id = req.params.id;
    try {
        const chocolateReview = await ReviewModel.findOne({ _id: id });
        return res.json(chocolateReview);
    } catch (error) {
        res.status(500).json({ message: "Error getting review!" });
    }
}

const findReviews = async (req: Request, res: Response) => {

    let findQuery: any = {};
    let sort = {};

    switch (req.query.sort) {
        case "Highest Rating":
            sort = { rating: -1 }
            break;
        case "Lowest Rating":
            sort = { rating: 1 }
            break;
        case "Lowest Price":
            sort = { price: 1 }
            break;
        case "Highest Price":
            sort = { price: -1 }
            break;
    }

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
            $lte: req.query.price
        }
    }

    try {
        const reviewPerPage = 2;
        const selectedPage = parseInt(req.query.selectedPage ? req.query.selectedPage.toString() : "1");
        //depending on selected page, skip all reviews before that page
        const skipValue = (selectedPage - 1) * reviewPerPage;
        const reviews = await ReviewModel.find(findQuery)
            .sort(sort)
            .skip(skipValue)
            .limit(reviewPerPage);

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
    findReviews,
    findReviewById
}