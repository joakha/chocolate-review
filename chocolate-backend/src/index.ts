import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import appUserRouter from "./routes/appUserRouter";
import cookieParser from "cookie-parser"

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
const mongoDbURL = process.env.mongoDbUrl as string;

//connect to mongodb
mongoose.connect(mongoDbURL);

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

//routes for appuser operations
chocolateBackendApp.use("/api/appUsers", appUserRouter);

//finally run app
chocolateBackendApp.listen(8080, () => {
    console.log(`Chocolate backend running and port is 8080`);
});
