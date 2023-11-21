import Business from "../schemas/business.js";

// Despues lo vamos a sacar de la sesion del usuario
const userId = "655638cc9e4fb7afc0eb39dc";

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

export function createNewBusiness(req, res) {
  return res.json({ message: "Not implemented" });

  // todo el codigo

  const business = new Business({
    //  todos los datos
    isApproved: false,
  });

  business.save();
  res.json(business);
}
