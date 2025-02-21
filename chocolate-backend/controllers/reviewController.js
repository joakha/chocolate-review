import ReviewModel from "../mongodb/models/Review.js"

const postReview = async (req, res) => {
    try {
        const toBeAddedReview = new ReviewModel({
            title: req.body.title,
            content: req.body.content,
            poster: req.body.poster,
        })
        await toBeAddedReview.save();
        res.status(200).json({ "info": "Review added successfully!" });
    } catch (err) {
        res.status(500).json({ error: 'Error adding review to mongoDB!', err });
    }
}

const editReview = async (req, res) => {
    try {
        await ReviewModel.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
        );
        res.status(200).json({ "info": "Review edited successfully!" });
    } catch (err) {
        res.status(500).json({ error: 'Error editing review!', err });
    }
}

export {
    postReview,
    editReview
}