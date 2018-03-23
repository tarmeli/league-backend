import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String
  },
  {
    timestamps: true
  },
  { collection: "user" }
);

export default mongoose.model("User", UserSchema);
