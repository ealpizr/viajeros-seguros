import Business from "../schemas/business.js";
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

export function getCurrentUser(req, res) {
  User.findById(req.session.user.id)
    .exec()
    .then((user) => {
      res.json({
        identification: user.identification,
        fullName: user.firstName + " " + user.lastName,
        homeAddress: user.homeAddress,
        email: user.email,
        phone: user.phoneNumber,
        dateOfBirth: user.dateOfBirth.toLocaleDateString("es-CR"),
        photo: user.profilePicture,
      });
    });
}

export function listUserBusinesses(req, res) {
  Business.find({ owner: req.session.user.id })
    .exec()
    .then((businesses) => {
      res.json(
        businesses.map((b) => {
          return {
            id: b._id,
            name: b.name,
            price: b.price,
            address: b.address,
            description: b.description,
            images: b.images,
            rating: calculateRatingAverage(b.reviews),
          };
        })
      );
    });
}
