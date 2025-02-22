import mongoose from "mongoose";
import TypeModel from "../mongodb/models/Type.js";
import dotenv from "dotenv"

dotenv.config();
const url = process.env.MONGODB_URL;

const initializeDB = async (mongoDBURL) => {
    try {
        await mongoose.connect(mongoDBURL);

        const testTypes = [
            { name: "Type A" },
            { name: "Type B" },
            { name: "Type C" },
        ];

        await TypeModel.insertMany(testTypes);
        mongoose.connection.close();
    } catch (err) {
        console.error(err)
    }

}

initializeDB(url);

export default initializeDB