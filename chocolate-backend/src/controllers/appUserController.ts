import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import AppUserModel from "../mongodb/appUser";

const registerAppUser = async (req: Request, res: Response) => {
    //check for errors from registration validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.array() });

    //then execute the rest
    let appUser;

    try {
        appUser = await AppUserModel.findOne({
            email: req.body.email
        })
        if (appUser) return res.status(400).json({ message: "Email already in use!" });
        appUser = new AppUserModel(req.body);
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

        return res.status(200).send({ message: "App user registration successful!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error!" });
    }
}

const loginAppUser = async (req: Request, res: Response) => {
    //check for errors from login validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.array() });

    //then execute the rest
    const { email, password } = req.body;

    let appUser;

    try {
        appUser = await AppUserModel.findOne({
            email: email
        });
        if (!appUser) return res.status(400).json({ message: "Credentials are invalid!" });
        const correctPassword = await bcrypt.compare(password, appUser.password);
        if (!correctPassword) return res.status(400).json({ message: "Credentials are invalid!" });

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
        return res.status(500).json({ message: "Server error!" });
    }
}

const logoutUser = async (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });

    res.send();
}

const verifyJWT = async (req: Request, res: Response) => {
    return res.status(200).send({ appUserId: req.appUserId })
}

export {
    registerAppUser,
    loginAppUser,
    verifyJWT,
    logoutUser
}