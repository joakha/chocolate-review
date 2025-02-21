import mongoose from "mongoose";

const connectToDB = async (mongoDBURL) => {
    try {
        await mongoose.connect(mongoDBURL);
    } catch (err) {
        console.error(err)
    }

}

export default connectToDB