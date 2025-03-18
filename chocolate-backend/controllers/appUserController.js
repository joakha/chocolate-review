import bcrypt from "bcrypt"
import AppUserModel from "../mongodb/models/AppUser.js";

const editAppUser = async (req, res) => {
    try {
        const saltRounds = await bcrypt.genSalt(10);
        const updatedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await AppUserModel.findByIdAndUpdate(req.params.id, {
            password: updatedPassword
        })
        res.status(200).json({ "info": "App User edited successfully!" });
    } catch (err) {
        res.status(500).json({ error: 'Error editing app user!', err });
    }
}

const getAppUser = async (req, res) => {
    try {
        const appUser = await AppUserModel.findById(req.params.id);
        const { username, ...otherData } = appUser._doc
        res.status(200).json(otherData);
    } catch (err) {
        res.status(500).json({ error: 'Error getting app user!', err });
    }
}

const postAppUser = async (req, res) => {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    try {
        const toBeAddedAppUser = new AppUserModel(
            {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email
            }
        )
        await toBeAddedAppUser.save();
        res.status(200).json(toBeAddedAppUser);
    } catch (err) {
        res.status(500).json({ error: 'Error creating app user in mongoDB!', err });
    }
}

export {
    editAppUser,
    getAppUser,
    postAppUser
}
