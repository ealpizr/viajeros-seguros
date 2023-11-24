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

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

const adminRouter = express.Router();
adminRouter.get("/businesses", listAdminBusinesses);
adminRouter.get("/unapproved-businesses", listUnapprovedBusinesses);
adminRouter.get("/users", listUsers);

const usersRouter = express.Router();

const businessesRouter = express.Router();
businessesRouter.get("/", listBusinesses);
businessesRouter.post("/", createNewBusiness);
businessesRouter.get("/:id", businessDetails);

const paymentMethodsRouter = express.Router();
paymentMethodsRouter.get("/", listPaymentMethods);

// Router principal
const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/admin", adminRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/businesses", businessesRouter);
appRouter.use("/payment-methods", paymentMethodsRouter);
export default appRouter;
