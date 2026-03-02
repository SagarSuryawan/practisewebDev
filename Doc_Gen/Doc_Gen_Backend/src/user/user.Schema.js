import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, maxLength:6 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);