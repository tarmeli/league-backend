import {
  createPlayer,
  findAllPlayers,
  findOnePlayer,
  updatePlayer,
  deletePlayer
} from "../controllers/player.controller";

const PlayerRoutes = app => {
  app.post("/players", (req, res) => {
    createPlayer(req, res);
  });
  app.get("/players", (req, res) => {
    findAllPlayers(req, res);
  });
  app.get("/players/:playerId", (req, res) => {
    findOnePlayer(req, res);
  });
  app.put("/players/:playerId", (req, res) => {
    updatePlayer(req, res);
  });
  app.delete("/players/:playerId", (req, res) => {
    deletePlayer(req, res);
  });
};

export default PlayerRoutes;
