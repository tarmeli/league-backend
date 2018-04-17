import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    matchName: String,
    players: [{}]
  },
  {
    timestamps: true
  },
  { collection: "matches" }
);

export default mongoose.model("Match", MatchSchema);
