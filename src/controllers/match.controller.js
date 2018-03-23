import Schema from "../models/match.model";

const createMatch = (req, res) => {
  console.log("CREATEMATCH:", req.body);
  if (!req.body.players) {
    return res.status(400).send({ message: "Match must have players" });
  }

  console.log("players", req.body.players[0].name);
  const match = new Schema({
    matchName: req.body.matchName,
    players: req.body.players
  });

  match.save((err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occured while creating a match" });
    } else {
      res.send(data);
    }
  });
};

const findAllMatches = (req, res) => {
  console.log("FINDALLMATCHES");
  Schema.find((err, matches) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occured while retrieving matches" });
    } else {
      res.send(matches);
    }
  });
};

const findOneMatch = (req, res) => {
  console.log("FINDONEMATCH");
  Schema.findById(req.params.matchId, (err, match) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Match not found with id " + req.params.matchId
        });
      }

      return res.status(500).send({
        message: "Error retrieving match with id " + req.params.matchId
      });
    }

    if (!match) {
      return res
        .status(404)
        .send({ message: "Match not found with id " + req.params.matchId });
    }

    res.send(match);
  });
};

const updateMatch = (req, res) => {
  console.log("UPDATEMATCH", req.body);
  Schema.findById(req.params.matchId, (err, match) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Match not found with id " + req.params.matchId
        });
      }

      return res.status(500).send({
        message: "Error retrieving match with id " + req.params.matchId
      });
    }
    if (!match) {
      return res
        .status(404)
        .send({ message: "Match not found with id " + req.params.matchId });
    }

    match.name = req.body.name;
    match.points = req.body.points;

    match.save((err, data) => {
      if (err) {
        res.status(500).send({
          message: "Could not update match with id " + req.params.matchId
        });
      } else {
        Schema.find((err, matches) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "Some error occured while retrieving matches" });
          } else {
            res.send(matches);
          }
        });
      }
    });
  });
};

const deleteMatch = (req, res) => {
  console.log("DELETEMATCHES");
  Schema.findByIdAndRemove(req.params.matchId, (err, match) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Match not found with id " + req.params.matchId
        });
      }

      return res.status(500).send({
        message: "Error retrieving match with id " + req.params.matchId
      });
    }
    if (!match) {
      return res
        .status(404)
        .send({ message: "Match not found with id " + req.params.matchId });
    }

    Schema.find((err, matches) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "Some error occured while retrieving matches" });
      } else {
        console.log("Deleted match with id:", req.params.matchId);
        res.send(matches);
      }
    });
  });
};

export { createMatch, findAllMatches, findOneMatch, deleteMatch, updateMatch };
