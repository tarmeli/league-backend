import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: String,
    points: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Player", PlayerSchema);
