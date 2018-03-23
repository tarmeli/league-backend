import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    matchName: String,
    players: [{ name: String, win: Boolean, tie: Boolean }]
  },
  {
    timestamps: true
  },
  { collection: "matches" }
);

export default mongoose.model("Match", MatchSchema);
