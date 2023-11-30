import bcrypt from "bcrypt";
import express from "express";
import {
  listBusinesses as listAdminBusinesses,
  listUnapprovedBusinesses,
  listUsers,
} from "./api/admin.js";
import { login, signup } from "./api/auth.js";
import {
  businessDetails,
  createNewBusiness,
  listBusinesses,
} from "./api/businesses.js";
import { listPaymentMethods } from "./api/payment-methods.js";
import { getCurrentUser } from "./api/users.js";

import { listReservations} from "./api/reservations.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

const adminRouter = express.Router();
adminRouter.get("/businesses", listAdminBusinesses);
adminRouter.get("/unapproved-businesses", listUnapprovedBusinesses);
adminRouter.get("/users", listUsers);
adminRouter.post("/hash", async (req, res) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  res.json({ passwordHash, salt });
});

const usersRouter = express.Router();
usersRouter.get("/me", getCurrentUser);
// /api/users/me

const businessesRouter = express.Router();
businessesRouter.get("/", listBusinesses);
businessesRouter.post("/", createNewBusiness);
businessesRouter.get("/:id", businessDetails);

const paymentMethodsRouter = express.Router();
paymentMethodsRouter.get("/", listPaymentMethods);

const reservationsRouter = express.Router();
reservationsRouter.get("/", listReservations);

// Router principal
const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/admin", adminRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/businesses", businessesRouter);
appRouter.use("/payment-methods", paymentMethodsRouter);
appRouter.use("/reservations", reservationsRouter); 
export default appRouter;
