import mongoose, { Schema } from "mongoose";
const todoSchema: Schema = new Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    email: { type: String, required: true }
})

export default mongoose.model("todo", todoSchema);