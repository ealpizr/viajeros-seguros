import Business from "../schemas/business.js";
/* schemas */

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
    
      console.log(cleanedUpBusinesses);
      res.json(cleanedUpBusinesses);
    });
}
