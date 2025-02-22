import express from "express"
import cors from "cors"
import connectToDB from "./mongoDB/connectToDB.js";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js"
import typeRouter from "./routes/typeRouter.js";

//making sure environment variables load properly
dotenv.config()
const serverPort = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;
const frontendURL = process.env.FRONTEND_URL;

//express application
const chocolateReviewApp = express();

//need to use json middleware so backend can handle requests with json body
chocolateReviewApp.use(express.json());

//allow this application to communicate with frontend
const corsOptions = {
    origin: [frontendURL]
};

chocolateReviewApp.use(cors(corsOptions));

//setup connection to mongodb
connectToDB(mongoDBURL);

//setup routers
chocolateReviewApp.use("/api/reviews", reviewRouter);
chocolateReviewApp.use("/api/types", typeRouter)

//finally run app
chocolateReviewApp.listen(serverPort, () => console.log(`Chocolate backend running, port is ${serverPort}`));
