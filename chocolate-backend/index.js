import express from "express"
import cors from "cors"
import connectToDB from "./mongoDB/connectToDB.js";
import dotenv from "dotenv";

//making sure environment variables load properly
dotenv.config()
const serverPort = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;
const frontendURL = process.env.FRONTEND_URL;

//express application
const customerApp = express();

//need to use json middleware so backend can handle requests with json body
customerApp.use(express.json());

//allow this application to communicate with frontend
const corsOptions = {
    origin: [frontendURL]
};

customerApp.use(cors(corsOptions));

//setup connection to mongodb
connectToDB(mongoDBURL);

//finally run app
customerApp.listen(serverPort, () => console.log(`Chocolate backend running, port is ${serverPort}`));
