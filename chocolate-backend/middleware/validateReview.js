import ReviewModel from "../mongodb/models/Review.js";

const validateReviewPost = (req, res, next) => {
    const { title, content, poster } = req.body;

    if (!title || !content || !poster) {
        return res.status(400).json({
            error: "request must include all required review info!"
        });
    }

    next();
}

const validateReviewEdit = async (req, res, next) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        if (!review.poster === req.body.poster) return res.status(401).json("You can't edit review created by another user!");
        next();
    } catch (err) {
        res.status(500).json({error: "Error validating review edit!", err});
    }
}

export {
    validateReviewPost,
    validateReviewEdit
}