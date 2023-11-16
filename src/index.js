import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./api/auth.js";
import businessRouter from "./api/businesses.js";
import categoryRouter from "./api/categories.js";
import reservationRouter from "./api/reservations.js";
import userRouter from "./api/users.js";

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(
    "mongodb+srv://viajeros-solos:lZ08pqReQ90wvgrW@cluster.srakrmu.mongodb.net/viajeros-solos?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
    process.exit();
  });

const staticPath = path.resolve(__dirname, "public");

const app = express();
app.use(express.json());

app.use(
  express.static(staticPath, {
    extensions: ["html"],
  })
);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/businesses", businessRouter);
app.use("/categories", categoryRouter);
app.use("/reservations", reservationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
