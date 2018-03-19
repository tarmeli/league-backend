import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./config/config";
import mongoose from "mongoose";
import PlayerRoutes from "./routes/player.routes";

let app = express();
const port = 8080;

console.log(PlayerRoutes);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on("error", () => {
  console.log("Couldn't connect to the database.");
  process.exit();
});

mongoose.connection.once("open", () => {
  console.log("Connected.");
});

app.get("/", (req, res) => {
  res.json({ message: "this is the first entry" });
});

PlayerRoutes(app);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
