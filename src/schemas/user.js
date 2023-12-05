import mongoose from "mongoose";

var userSchema = mongoose.Schema({
  identification: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  homeAddress: String,
  phoneNumber: String,
  role: String,
  profilePicture: String,

  paymentMethods: [
    new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      type: String,
      details: String,
    }),
  ],

  reservations: [mongoose.Schema.Types.ObjectId],
});

export default mongoose.model("User", userSchema, "users");
