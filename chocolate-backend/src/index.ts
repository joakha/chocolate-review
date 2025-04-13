import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import appUserRouter from "./routes/appUserRouter";

//making sure environment variables load properly
dotenv.config()
const mongoDbURL = process.env.mongoDbUrl as string;

//connect to mongodb
mongoose.connect(mongoDbURL)

//express app
const chocolateBackendApp = express();

//need to use json middleware so backend can handle requests with json body
chocolateBackendApp.use(express.json());
chocolateBackendApp.use(express.urlencoded({ extended: true }));

//allow this application to communicate with frontend
chocolateBackendApp.use(cors());

//routes for appuser operations
chocolateBackendApp.use("/api/appUsers", appUserRouter);

chocolateBackendApp.listen(8080, () => {
    console.log(`Chocolate backend running and port is 8080`);
});
