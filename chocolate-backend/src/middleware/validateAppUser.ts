import { check } from "express-validator";

const validateRegister = [
    check("email", "Email required!").isEmail(),
    check("username", "Username required!").isString(),
    check("password", "Password length should be 8 or more").isLength({ min: 8 })
];

export {
    validateRegister
};