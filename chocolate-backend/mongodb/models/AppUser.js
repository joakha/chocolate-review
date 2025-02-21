import mongoose from "mongoose";

const AppUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
);

const AppUserModel = mongoose.model("user", AppUserSchema);

export default AppUserModel