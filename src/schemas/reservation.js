import mongoose from "mongoose";

var reservationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  dailyPrice: Number,
  totalPrice: Number,
  paymentMethodId: mongoose.Schema.Types.ObjectId,
  numberOfPeople: Number,
  numberOfDays: Number,
  days: [Date],
});

export default mongoose.model("Reservation", reservationSchema, "reservations");
