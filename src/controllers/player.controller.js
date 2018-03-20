import Schema from "../models/player.model";

const createPlayer = (req, res) => {
  console.log("CREATEPLAYER:", req.body);
  if (!req.body.name) {
    return res.status(400).send({ message: "Player must have a name" });
  } else if (!req.body.points) {
    return res.status(400).send({ message: "Points must be entered" });
  }

  const player = new Schema({ name: req.body.name, points: req.body.points });

  player.save((err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occured while creating a player" });
    } else {
      res.send(data);
    }
  });
};

const findAllPlayers = (req, res) => {
  console.log("FINDALLPLAYERS");
  Schema.find((err, players) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occured while retrieving players" });
    } else {
      res.send(players);
    }
  });
};

const findOnePlayer = (req, res) => {
  console.log("FINDONEPLAYER");
  Schema.findById(req.params.playerId, (err, player) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Player not found with id " + req.params.playerId
        });
      }

      return res.status(500).send({
        message: "Error retrieving player with id " + req.params.playerId
      });
    }

    if (!player) {
      return res
        .status(404)
        .send({ message: "Player not found with id " + req.params.playerId });
    }

    res.send(player);
  });
};

const updatePlayer = (req, res) => {
  console.log("UPDATEPLAYER", req.body);
  Schema.findById(req.params.playerId, (err, player) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Player not found with id " + req.params.playerId
        });
      }

      return res.status(500).send({
        message: "Error retrieving player with id " + req.params.playerId
      });
    }
    if (!player) {
      return res
        .status(404)
        .send({ message: "Player not found with id " + req.params.playerId });
    }

    player.name = req.body.name;
    player.points = req.body.points;

    player.save((err, data) => {
      if (err) {
        res.status(500).send({
          message: "Could not update player with id " + req.params.playerId
        });
      } else {
        res.send(data);
      }
    });
  });
};

const deletePlayer = (req, res) => {
  console.log("DELETEPLAYERS");
  Schema.findByIdAndRemove(req.params.playerId, (err, player) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Player not found with id " + req.params.playerId
        });
      }

      return res.status(500).send({
        message: "Error retrieving player with id " + req.params.playerId
      });
    }
    if (!player) {
      return res
        .status(404)
        .send({ message: "Player not found with id " + req.params.playerId });
    }

    res.send({ message: "Player deleted successfully" });
  });
};

export {
  createPlayer,
  findAllPlayers,
  findOnePlayer,
  deletePlayer,
  updatePlayer
};
