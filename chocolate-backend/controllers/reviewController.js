import ReviewModel from "../mongodb/models/Review.js"

const postReview = async (req, res) => {
    try {
        const toBeAddedReview = new ReviewModel(
            req.body
        )
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

const getReviews = async (req, res) => {

    const { poster, type } = req.query;

    let reviews;

    //fetch reviews based on poster, review type or all reviews if neither is included in the request
    try {
        if (poster) {
            reviews = await ReviewModel.find({ poster });
        } else if (type) {
            reviews = await ReviewModel.find({
                types: {
                    $in: [type]
                }
            });
        } else {
            reviews = await ReviewModel.find().populate(["type"]);
        }
        if (reviews.length === 0) return res.status(404).json({ "info": "No reviews were found!" });
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching reviews from mongoDB!', err });
    }
}

const deleteReview = async (req, res) => {
    try {
        const toBeDeletedCustomerId = req.params.id;
        await ReviewModel.deleteOne({ _id: toBeDeletedCustomerId });
        res.status(200).json({ "info": "Deletion successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting customer from mongoDB!', err });
    }
}

const getReview = async (req, res) => {
    try {
        const review = await ReviewModel.findById(req.params.id).populate(["type"])
        if (!review) return res.status(404).json({ info: "No review was found!" });
        res.status(200).json(review);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error fetching review from mongoDB!', err });
    }
}

export {
    postReview,
    editReview,
    getReviews,
    deleteReview,
    getReview
}
