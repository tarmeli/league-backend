import {
  createMatch,
  findAllMatches,
  findOneMatch,
  updateMatch,
  deleteMatch
} from "../controllers/match.controller";

const MatchRoutes = app => {
  app.post("/matches", (req, res) => {
    createMatch(req, res);
  });
  app.get("/matches", (req, res) => {
    findAllMatches(req, res);
  });
  app.get("/matches/:matchId", (req, res) => {
    findOneMatch(req, res);
  });
  app.put("/matches/:matchId", (req, res) => {
    updateMatch(req, res);
  });
  app.delete("/matches/:matchId", (req, res) => {
    deleteMatch(req, res);
  });
};

export default MatchRoutes;
