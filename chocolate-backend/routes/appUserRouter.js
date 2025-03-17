import express from "express";
import { getAppUser, postAppUser, editAppUser } from "../controllers/appUserController.js";
import { validateAppUserEdit, validateAppUserGet, validateAppUserPost } from "../middleware/validateAppUser.js";
import { login } from "../controllers/authController.js";
import { validateLogin } from "../middleware/validateAuth.js";

const appUserRouter = express.Router();

appUserRouter.route("/")
    .post(validateAppUserPost, postAppUser)

appUserRouter.route("/login")
    .post(validateLogin, login);

appUserRouter.route("/:id")
    .put(validateAppUserEdit, editAppUser)
    .get(validateAppUserGet, getAppUser)

export default appUserRouter