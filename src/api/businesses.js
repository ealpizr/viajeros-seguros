import Business from "../schemas/business.js";

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

export function getTotalBusinesses(req, res) {
  User.find()
    .exec()
    .then(function (businesses) {
      const totalBusinesses = businesses.length;

      res.json(totalBusinesses);
    });
}
