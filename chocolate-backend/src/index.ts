import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import appUserRouter from "./routes/appUserRouter";
import cookieParser from "cookie-parser"
import path from "path"
import { v2 as cloudinary } from "cloudinary"
import reviewRouter from "./routes/reviewRouter";
import { Request, Response } from "express";

//tell typescript it's ok to attach appUserId to requests
declare global {
    namespace Express {
        interface Request {
            appUserId: string;
        }
    }
}

//making sure environment variables load properly
//different .env files for development and tests
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env" })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MONGO_DB_URL = process.env.MONGO_DB_URL as string;
mongoose.connect(MONGO_DB_URL);

const chocolateBackendApp = express();

//need to use json middleware so backend can handle requests with json body
chocolateBackendApp.use(express.json());
chocolateBackendApp.use(express.urlencoded({ extended: true }));

//parse cookie header for client requests
chocolateBackendApp.use(cookieParser());

//allow this application to communicate with frontend
chocolateBackendApp.use(cors({
    //only frontend address defined in .env can access server during development
    origin: process.env.CLIENT_URL,
    //allow cookies in requests and responses
    credentials: true
}));

//serve built frontend static files
chocolateBackendApp.use(express.static(path.join(__dirname, "../../chocolate-frontend/dist")));

//routes for appuser operations
chocolateBackendApp.use("/api/appUsers", appUserRouter);

//routes for review operations
chocolateBackendApp.use("/api/reviews", reviewRouter);

//route all unmatched requests
chocolateBackendApp.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../chocolate-frontend/dist/index.html"))
})

//finally run app
chocolateBackendApp.listen(8080, () => {
    console.log(`Chocolate backend running and port is 8080`);
});
