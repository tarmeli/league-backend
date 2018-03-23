import Schema from "../models/user.model";

const createUser = (req, res) => {
  console.log("CREATEUSER:", req.body);
  if (!req.body.name) {
    return res.status(400).send({ message: "User must have a name" });
  }

  const user = new Schema({
    name: req.body.name
  });

  user.save((err, data) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occured while creating a user" });
    } else {
      res.send(data);
    }
  });
};

const findAllUsers = (req, res) => {
  console.log("FINDALLUSERS");
  Schema.find((err, users) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occured while retrieving users" });
    } else {
      res.send(users);
    }
  });
};

const findOneUser = (req, res) => {
  console.log("FINDONEUSER");
  Schema.findById(req.params.userId, (err, user) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }

      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    }

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with id " + req.params.userId });
    }

    res.send(user);
  });
};

const updateUser = (req, res) => {
  console.log("UPDATEUSER", req.body);
  Schema.findById(req.params.userId, (err, user) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }

      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with id " + req.params.userId });
    }

    user.name = req.body.name;
    user.points = req.body.points;

    user.save((err, data) => {
      if (err) {
        res.status(500).send({
          message: "Could not update user with id " + req.params.userId
        });
      } else {
        Schema.find((err, users) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "Some error occured while retrieving users" });
          } else {
            res.send(users);
          }
        });
      }
    });
  });
};

const deleteUser = (req, res) => {
  console.log("DELETEUSERS");
  Schema.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }

      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with id " + req.params.userId });
    }

    Schema.find((err, users) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "Some error occured while retrieving users" });
      } else {
        console.log("Deleted user with id:", req.params.userId);
        res.send(users);
      }
    });
  });
};

export { createUser, findAllUsers, findOneUser, deleteUser, updateUser };
