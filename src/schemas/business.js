import mongoose from "mongoose";

var businessSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  ownerId: mongoose.Schema.Types.ObjectId,
  address: String,
  categoriesIds: [mongoose.Schema.Types.ObjectId],
  description: String,
  images: [String],
  isApproved: Boolean,

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
