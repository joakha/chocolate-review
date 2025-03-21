import bcrypt from "bcrypt"
import AppUserModel from "../mongodb/models/AppUser.js";

const login = async (req, res) => {
    try {
        const appUser = await AppUserModel.findOne({ username: req.body.username });
        if (!appUser) return res.status(400).json("Username or password wrong!");

        const passwordOK = await bcrypt.compare(req.body.password, appUser.password);
        if (!passwordOK) return res.status(400).json("Username or password wrong!");

        const { password, ...otherUserData } = appUser._doc;

        res.status(200).json(otherUserData);
    } catch (err) {
        res.status(500).json({ error: 'Error logging in!', err });
    }
}

export {
    login
}