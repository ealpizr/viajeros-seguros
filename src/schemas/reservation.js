import mongoose from "mongoose";

var reservationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  totalPaid: Number,
  paymentMethodId: mongoose.Schema.Types.ObjectId,
  day: Date,
});

export default mongoose.model("Reservation", reservationSchema, "reservations");
