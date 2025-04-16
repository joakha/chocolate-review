import { Request, Response } from "express";
import AppUser from "../mongodb/models/appUser";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"

const registerAppUser = async (req: Request, res: Response) => {
    //check for errors from registration validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) res.status(400).json({ message: validationErrors.array() });

    //then execute the rest
    try {
        let appUser = await AppUser.findOne({
            email: req.body.email
        })
        if (appUser) res.status(400).json({ alert: "Email already in use!" });
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

        res.status(200).send({ message: "App user registration successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ alert: "Server error!" });
    }
}

const loginAppUser = async (req: Request, res: Response): Promise<any> => {
    //check for errors from login validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.array() });

    //then execute the rest
    const { email, password } = req.body;

    try {
        let appUser = await AppUser.findOne({
            email: email
        });
        if (!appUser) return res.status(400).json({ alert: "Credentials are invalid!" });
        const correctPassword = await bcrypt.compare(password, appUser.password);
        if (!correctPassword) return res.status(400).json({ alert: "Credentials are invalid!" });

        const token = jwt.sign(
            { appUserId: appUser.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });

        return res.status(200).json({ appUserId: appUser._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ alert: "Server error!" });
    }
}

export {
    registerAppUser,
    loginAppUser
}