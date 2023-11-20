import User from "../schemas/user.js";

export function listUsers(req, res) {
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
}