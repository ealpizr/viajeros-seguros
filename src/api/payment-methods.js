import User from "../schemas/user.js";

// Despues lo vamos a sacar de la sesion del usuario
const userId = "655638cc9e4fb7afc0eb39dc";

export function listPaymentMethods(req, res) {
  User.findById(userId)
    .exec()
    .then(function (user) {
      res.json(user.paymentMethods);
    });
}
