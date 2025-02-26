import AppUserModel from "../mongodb/models/AppUser.js";

const validateAppUserEdit = async (req, res, next) => {
    try {
        if (!req.params.id) return res.status(400).json("Request must include app user id!");
        if (!req.body.password) return res.status(400).json("Request must include app user password!");
        next();
    } catch (err) {
        res.status(500).json({ error: "Error validating app user edit!", err });
    }
}

const validateAppUserGet = async (req, res, next) => {
    try {
        if (!req.params.id) return res.status(400).json("Request must include app user id!");
        const appUser = await AppUserModel.findById(req.params.id);
        if (!appUser) return res.status(400).json("No user found!");
        next();
    } catch (err) {
        res.status(500).json({ error: "Error validating app user get!", err });
    }
}

const validateAppUserPost = async (req, res, next) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({
            error: "request must include all required app user info!"
        });
    }

    next();
}

export {
    validateAppUserEdit,
    validateAppUserGet,
    validateAppUserPost
}