const validateLogin = async (req, res, next) => {
    try {
        if (!req.body.username) return res.status(400).json("Request must include username!");
        if (!req.body.password) return res.status(400).json("Request must include app user password!");
        next();
    } catch (err) {
        res.status(500).json({ error: "Error validating login!", err });
    }
}

export {
    validateLogin
}