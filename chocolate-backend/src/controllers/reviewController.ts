import { Request, Response } from "express"
import cloudinary from "cloudinary"
import { Review } from "../types/types";
import ReviewModel from "../mongodb/review";
import { validationResult } from "express-validator";

const createReview = async (req: Request, res: Response) => {
    //check for errors from review POST validation
    /*     const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.array() }); */

    //execute the rest
    try {
        const pictures = req.files as Express.Multer.File[];
        const review: Review = req.body;

        const promises = pictures.map(async (picture) => {
            const b64 = Buffer.from(picture.buffer).toString("base64");

            let URI = `data:${picture.mimetype};base64,${b64}`;
            const res = await cloudinary.v2.uploader.upload(URI);

            return res.url;
        })

        const pictureURLs = await Promise.all(promises);

        review.pictures = pictureURLs;
        review.editedAt = new Date();
        review.appUserId = req.appUserId;

        const toBeSavedReview = new ReviewModel(review);
        await toBeSavedReview.save();

        return res.status(201).send(toBeSavedReview);
    } catch (error) {
        console.error("Error occurred when creating a new review: ", error);
        return res.status(500).json({ message: "Server error!" });
    }
}

export {
    createReview
}