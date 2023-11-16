import express from "express";
import User from "../schemas/user.js";

const router = express.Router();

router.get("/list", function (req, res) {
  User.find()
    .exec()
    .then(function (users) {
      const cleanedUpUsers = [];

      for (let i = 0; i < users.length; i++) {
        const identification = users[i].identification;
        const firstName = users[i].firstName;
        const lastName = users[i].lastName;
        const email = users[i].email;

        const fullName = firstName + " " + lastName;

        const user = {
          identification: identification,
          fullName: fullName,
          email: email,
        };

        cleanedUpUsers.push(user);
      }

      res.json(cleanedUpUsers);
    });
});

router.get("/count", function (req, res) {
  User.find()
    .exec()
    .then(function (users) {
      res.json(users.length);
    });
});

export default router;
