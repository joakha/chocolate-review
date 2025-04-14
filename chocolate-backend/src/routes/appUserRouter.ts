import express from "express";
import { registerAppUser, loginAppUser } from "../controllers/appUserController";
import { validateRegister, validateLogin } from "../middleware/validateAppUser";

const appUserRouter = express.Router();

appUserRouter.post("/register", validateRegister, registerAppUser);

appUserRouter.post("/login", validateLogin, loginAppUser);

export default appUserRouter;