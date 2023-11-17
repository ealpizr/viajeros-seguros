import mongoose from "mongoose";

export default function connectToDB() {
  const MONGO_URI =
    "mongodb+srv://viajeros-solos:lZ08pqReQ90wvgrW@cluster.srakrmu.mongodb.net/viajeros-solos";

  return mongoose.connect(MONGO_URI, {
    retryWrites: true,
    retryReads: true,
    w: "majority",
  });
}
