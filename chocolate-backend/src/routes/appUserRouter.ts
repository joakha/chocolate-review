import express from "express";
import { registerAppUser, loginAppUser, verifyJWT, logoutUser, getUserInfo } from "../controllers/appUserController";
import { validateRegister, validateLogin, validateJWT } from "../middleware/validateAppUser";

const appUserRouter = express.Router();

appUserRouter.post("/register", validateRegister, registerAppUser);
appUserRouter.post("/login", validateLogin, loginAppUser);
appUserRouter.get("/verify-jwt", validateJWT, verifyJWT);
appUserRouter.post("/logout", logoutUser);
appUserRouter.get("/get-user-info", validateJWT, getUserInfo);

export default appUserRouter;