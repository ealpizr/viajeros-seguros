import User from "../schemas/user.js";

// Despues lo vamos a sacar de la sesion del usuario
const userId = "65655817c7cfd62135ae90a4";

export function listPaymentMethods(req, res) {
  User.findById(userId)
    .exec()
    .then(function (user) {
      res.json(user.paymentMethods);
    });
}
