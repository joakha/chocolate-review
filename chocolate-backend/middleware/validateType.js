const validateTypePost = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "request must include all required type info!"
        });
    }

    next();
}

export {
    validateTypePost
}