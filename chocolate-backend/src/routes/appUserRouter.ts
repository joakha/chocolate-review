import express from "express";
import { registerAppUser } from "../controllers/appUserController";

const appUserRouter = express.Router();

appUserRouter.post("/register", registerAppUser);