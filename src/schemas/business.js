import mongoose from "mongoose";

var businessSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  description: String,
  images: [String],
  isApproved: Boolean,

  phoneNumber: Number,
  price: Number,

  reservations: [mongoose.Schema.Types.ObjectId],

  reviews: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
      rating: Number,
      comment: String,
      date: Date,
    },
  ],
});

export default mongoose.model("Business", businessSchema, "businesses");
