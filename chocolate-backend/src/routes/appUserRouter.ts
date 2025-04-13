import express from "express";
import { registerAppUser } from "../controllers/appUserController";
import { validateRegister } from "../middleware/validateAppUser";

const appUserRouter = express.Router();

appUserRouter.post("/register", validateRegister, registerAppUser);

export default appUserRouter;