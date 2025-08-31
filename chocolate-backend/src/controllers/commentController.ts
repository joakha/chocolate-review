import { Request, Response } from "express"
import { Comment, CommentSearch } from "../types/types";
import CommentModel from "../mongodb/comment";

const createComment = async (req: Request, res: Response) => {
    try {
        const comment: Comment = req.body;

        const toBeSavedComment = new CommentModel(comment);
        await toBeSavedComment.save();

        return res.status(201).send(toBeSavedComment);
    } catch (error) {
        console.error("Error occurred when creating a new comment: ", error);
        return res.status(500).json({ message: "Server error!" });
    }
}

const getComments = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const commentsPerPage = 2;
        const selectedPage = parseInt(req.query.selectedPage ? req.query.selectedPage.toString() : "1");

        //depending on selected page, skip all reviews before that page
        const skipValue = (selectedPage - 1) * commentsPerPage;

        const comments = await CommentModel.find({ reviewId: id })
            .skip(skipValue)
            .limit(commentsPerPage);

        const commentTotal = await CommentModel.countDocuments({ reviewId: id });

        const response: CommentSearch = {
            data: comments,
            pagination: {
                commentTotal,
                selectedPage,
                pageTotal: Math.ceil(commentTotal / commentsPerPage)
            }
        };

        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error!" });
    }

};

export {
    createComment,
    getComments
}