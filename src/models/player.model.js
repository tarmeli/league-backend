import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: String,
    points: Number
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Player", PlayerSchema);
