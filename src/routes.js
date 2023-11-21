import express from "express";
import { login, signup } from "./api/auth.js";
import { createNewBusiness, listBusinesses } from "./api/businesses.js";
import { listPaymentMethods } from "./api/payment-methods.js";
import { listUsers } from "./api/users.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

const usersRouter = express.Router();
usersRouter.get("/", listUsers);

const businessesRouter = express.Router();
businessesRouter.get("/", listBusinesses);
businessesRouter.post("/", createNewBusiness);

const paymentMethodsRouter = express.Router();
paymentMethodsRouter.get("/", listPaymentMethods);

// Router principal
const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/businesses", businessesRouter);
appRouter.use("/payment-methods", paymentMethodsRouter);
export default appRouter;
