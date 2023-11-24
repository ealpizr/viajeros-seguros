import express from "express";
import { listBusinesses, listUsers } from "./api/admin.js";
import { login, signup } from "./api/auth.js";
import { createNewBusiness } from "./api/businesses.js";
import { listPaymentMethods } from "./api/payment-methods.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

const adminRouter = express.Router();
adminRouter.get("/businesses", listBusinesses);
adminRouter.get("/users", listUsers);

const usersRouter = express.Router();

const businessesRouter = express.Router();
businessesRouter.post("/", createNewBusiness);

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
