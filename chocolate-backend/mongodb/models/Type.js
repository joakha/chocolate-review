import mongoose from "mongoose"

const TypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }
);

const TypeModel = mongoose.model("type", TypeSchema);

export default TypeModel