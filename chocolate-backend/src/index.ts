import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import appUserRouter from "./routes/appUserRouter";
import cookieParser from "cookie-parser"
import path from "path"
import { v2 as cloudinary } from "cloudinary"

declare global {
    namespace Express {
        interface Request {
            appUserId: string;
        }
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//making sure environment variables load properly
//different .env files for development and tests
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env" })
const MONGO_DB_URL = process.env.MONGO_DB_URL as string;

//connect to mongodb
mongoose.connect(MONGO_DB_URL);

//express app
const chocolateBackendApp = express();

//need to use json middleware so backend can handle requests with json body
chocolateBackendApp.use(express.json());
chocolateBackendApp.use(express.urlencoded({ extended: true }));

chocolateBackendApp.use(cookieParser());

//allow this application to communicate with frontend
chocolateBackendApp.use(cors({
    //only frontend address defined in .env can access server
    origin: process.env.CLIENT_URL,
    //requests from client url must include http cookie
    credentials: true
}));

chocolateBackendApp.use(express.static(path.join(__dirname, "../../chocolate-frontend/dist")));

//routes for appuser operations
chocolateBackendApp.use("/api/appUsers", appUserRouter);

//finally run app
chocolateBackendApp.listen(8080, () => {
    console.log(`Chocolate backend running and port is 8080`);
});
