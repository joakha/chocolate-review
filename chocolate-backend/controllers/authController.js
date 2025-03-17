import bcrypt from "bcrypt"
import AppUserModel from "../mongodb/models/AppUser.js";

const login = async (req, res) => {
    try {
        const appUser = await AppUserModel.findOne({ username: req.body.username });
        if (!appUser) res.status(400).json("Username or password wrong!");

        const passwordOK = await bcrypt.compare(req.body.password, appUser.password);
        if (!passwordOK) res.status(400).json("Username or password wrong!");
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ error: 'Error logging in!', err });
    }
}

export {
    login
}