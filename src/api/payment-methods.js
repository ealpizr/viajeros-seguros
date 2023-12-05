import User from "../schemas/user.js";

export function listPaymentMethods(req, res) {
  User.findById(req.session.user.id)
    .exec()
    .then(function (user) {
      res.json(user.paymentMethods);
    });
}
