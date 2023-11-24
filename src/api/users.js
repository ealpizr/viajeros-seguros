import User from "../schemas/user.js";

const userId = "655638cc9e4fb7afc0eb39dc";

export function getCurrentUser(req, res) {
  User.findById(userId)
    .exec()
    .then((user) => {
      res.json({
        identification: user.identification,
        fullName: user.firstName + " " + user.lastName,
        homeAddress: user.homeAddress,
        email: user.email,
        phone: user.phoneNumber,
        dateOfBirth: user.dateOfBirth.toLocaleDateString("es-CR"),
      });
    });
}
