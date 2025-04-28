import express from "express";
import { registerAppUser, loginAppUser, verifyJWT, logoutUser } from "../controllers/appusercontroller";
import { validateRegister, validateLogin, validateJWT } from "../middleware/validateappuser";

const appUserRouter = express.Router();

appUserRouter.post("/register", validateRegister, registerAppUser);
appUserRouter.post("/login", validateLogin, loginAppUser);
appUserRouter.get("/verify-jwt", validateJWT, verifyJWT);
appUserRouter.post("/logout", logoutUser);

export default appUserRouter;