import { Schema, model } from "mongoose";
import { AppUser } from "../../types/types";

const appUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const AppUser = model<AppUser>("AppUser", appUserSchema);

export default AppUser;