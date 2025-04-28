import { Schema, model } from "mongoose";
import { AppUser } from "../types/types";
import bcrypt from "bcryptjs"

export const appUserSchema = new Schema({
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

appUserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const AppUser = model<AppUser>("AppUser", appUserSchema);

export default AppUser;