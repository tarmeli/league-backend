import {
  createUser,
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

const UserRoutes = app => {
  app.post("/users", (req, res) => {
    createUser(req, res);
  });
  app.get("/users", (req, res) => {
    findAllUsers(req, res);
  });
  app.get("/users/:userId", (req, res) => {
    findOneUser(req, res);
  });
  app.put("/users/:userId", (req, res) => {
    updateUser(req, res);
  });
  app.delete("/users/:userId", (req, res) => {
    deleteUser(req, res);
  });
};

export default UserRoutes;
