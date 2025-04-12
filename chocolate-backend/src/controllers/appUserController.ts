import { Request, Response } from "express";
import AppUser from "../mongodb/models/AppUser";

const registerAppUser = async (req: Request, res: Response) => {
    try {
        let appUser = await AppUser.findOne({
            email: req.body.email
        })
        if (appUser) res.status(400).json({ alert: "Email already in use!" });
        appUser = new AppUser(req.body);
        await appUser.save();
    } catch (err) {
        res.status(500).json({ alert: "Server error!" });
    }
}

export {
    registerAppUser
};