import Business from "../schemas/business.js";
import Category from "../schemas/category.js";
import User from "../schemas/user.js";

function calculateRatingAverage(reviews) {
  const ratings = reviews.map((review) => {
    return review.rating;
  });

  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }

  const average = sum / ratings.length;

  return average;
}

export function listUnapprovedBusinesses(req, res) {
  try {
    Business.find({ isApproved: false })
      .populate({
        path: "categories",
        select: "name",
        // The schema property here is not required.
        // We just add it here so that VSCode's remove unused imports
        // functionallity doesn't break the code.
        schema: Category,
      })
      .exec()
      .then(function (businesses) {
        res.json(
          businesses.map((b) => {
            return {
              id: b._id,
              name: b.name,
              price: b.price,
              address: b.address,
              description: b.description,
              categories: b.categories.map((c) => c.name).join(", "),
              phone: b.phoneNumber,
            };
          })
        );
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar los negocios" });
  }
}

export function listBusinesses(req, res) {
  Business.find()
    .populate({
      path: "owner",
      select: "firstName lastName",
    })
    .populate({
      path: "categories",
      select: "name",
      // The schema property here is not required.
      // We just add it here so that VSCode's remove unused imports
      // functionallity doesn't break the code.
      schema: Category,
    })
    .exec()
    .then(function (businesses) {
      const cleanedUpBusinesses = [];

      for (let i = 0; i < businesses.length; i++) {
        const name = businesses[i].name;
        const owner =
          businesses[i].owner.firstName + " " + businesses[i].owner.lastName;
        const categories = businesses[i].categories
          .map((c) => c.name)
          .join(", ");
        const rating = calculateRatingAverage(businesses[i].reviews);

        const business = {
          name: name,
          owner: owner,
          categories: categories,
          rating: rating,
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
