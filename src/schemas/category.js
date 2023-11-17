import mongoose from "mongoose";

var categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
});

export default mongoose.model("Category", categorySchema, "categories");
