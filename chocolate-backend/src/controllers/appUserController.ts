import { Request, Response } from "express";
import AppUser from "../mongodb/models/appUser";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const registerAppUser = async (req: Request, res: Response): Promise<any> => {
    //check for errors from validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.array() });

    //then execute the rest
    try {
        let appUser = await AppUser.findOne({
            email: req.body.email
        })
        if (appUser) return res.status(400).json({ alert: "Email already in use!" });
        appUser = new AppUser(req.body);
        await appUser.save();

        const token = jwt.sign(
            { appUserId: appUser.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });

        return res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ alert: "Server error!" });
    }
}
