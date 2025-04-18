import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

const validateRegister = [
    check("email", "Email required!").isEmail(),
    check("username", "Username required!").isString(),
    check("password", "Password length should be 8 or more characters").isLength({ min: 8 })
];

const validateLogin = [
    check("email", "Email required!").isEmail(),
    check("password", "Password length should be 8 or more characters").isLength({ min: 8 })
];

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const JWT = req.cookies["token"];
    if (!JWT) return res.status(401).json({ message: "unauthorized" });

    try {
        const decodedJWT = jwt.verify(JWT, process.env.JWT_SECRET as string);
        req.appUserId = (decodedJWT as JwtPayload).appUserId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "unauthorized" });
    }
}

export {
    validateRegister,
    validateLogin,
    validateJWT
};