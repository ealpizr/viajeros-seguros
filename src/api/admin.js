import Business from "../schemas/business.js";
import User from "../schemas/user.js";

export function listUnapprovedBusinesses(req, res) {
  // aqui va todo el codigo
  res.json({ message: "Hola" });
}

export function listBusinesses(req, res) {
  Business.find()
    .exec()
    .then(function (businesses) {
      const cleanedUpBusinesses = [];

      for (let i = 0; i < businesses.length; i++) {
        const name = businesses[i].name;
        const ownerId = businesses[i].ownerId;
        const categoriesIds = businesses[i].categoriesIds;

        const business = {
          name: name,
          ownerId: ownerId,
          categoriesIds: categoriesIds,
        };

        cleanedUpBusinesses.push(business);
      }

      res.json(cleanedUpBusinesses);
    });
}

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
