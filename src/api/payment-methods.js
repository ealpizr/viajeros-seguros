import mongoose from "mongoose";
import User from "../schemas/user.js";

export function listPaymentMethods(req, res) {
  User.findById(req.session.user.id)
    .exec()
    .then(function (user) {
      res.json(user.paymentMethods);
    });
}

export async function createPaymentMethod(req, res) {
  const { type, details } = req.body;
  if (!type || !details) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const user = await User.findById(req.session.user.id).exec();
  user.paymentMethods.push({
    _id: new mongoose.Types.ObjectId(),
    type,
    details,
  });
  await user.save();

  return res.status(201).json({ message: "Payment method created" });
}

export async function deletePaymentMethod(req, res) {
  const { id } = req.params;

  const user = await User.findById(req.session.user.id).exec();
  user.paymentMethods = user.paymentMethods.filter(
    (pm) => pm._id.toString() !== id
  );
  await user.save();

  return res.status(200).json({ message: "Payment method deleted" });
}
