import mongoose from "mongoose";

export default function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://viajeros-solos:lZ08pqReQ90wvgrW@cluster.srakrmu.mongodb.net/?retryWrites=true&w=majority"
    )
    .catch((error) => {
      console.error("Error connecting to database: ", error);
      process.exit();
    });
}
