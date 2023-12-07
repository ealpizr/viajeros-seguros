import express from "express";
import upload from "./middleware/multer.js";
import requiresAdminMiddleware from "./middleware/requires-admin.js";

import {
  approveBusiness,
  denyBusiness,
  listBusinesses as listAdminBusinesses,
  listUnapprovedBusinesses,
  listUsers,
} from "./api/admin.js";

import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "./api/auth.js";

import {
  businessDetails,
  createNewBusiness,
  listBusinesses,
  rateBusiness,
} from "./api/businesses.js";

import {
  createPaymentMethod,
  deletePaymentMethod,
  listPaymentMethods,
} from "./api/payment-methods.js";

import { bookReservations, listReservations } from "./api/reservations.js";

import { getCurrentUser, listUserBusinesses } from "./api/users.js";

import { listBusinessReservations } from "./api/business-bookings.js";
import { listCategories } from "./api/categories.js";

const authRouter = express.Router();
authRouter.post("/signup", upload.single("photo"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

const adminRouter = express.Router();
adminRouter.use(requiresAdminMiddleware);
adminRouter.get("/businesses", listAdminBusinesses);
adminRouter.post("/businesses/:id/approve", approveBusiness);
adminRouter.post("/businesses/:id/deny", denyBusiness);
adminRouter.get("/unapproved-businesses", listUnapprovedBusinesses);
adminRouter.get("/users", listUsers);

const userRouter = express.Router();
userRouter.get("/", getCurrentUser);
userRouter.get("/reservations", listReservations);
userRouter.get("/businesses", listUserBusinesses);
userRouter.post("/book-reservations", bookReservations);

const businessesRouter = express.Router();
businessesRouter.get("/", listBusinesses);
businessesRouter.post("/", upload.array("images[]"), createNewBusiness);
businessesRouter.get("/:id", businessDetails);
businessesRouter.get("/:id/reservations", listBusinessReservations);
businessesRouter.post("/:id/rate", rateBusiness);

const paymentMethodsRouter = express.Router();
paymentMethodsRouter.get("/", listPaymentMethods);
paymentMethodsRouter.post("/", createPaymentMethod);
paymentMethodsRouter.delete("/:id", deletePaymentMethod);

const categoriesRouter = express.Router();
categoriesRouter.get("/", listCategories);

// Router principal
const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/admin", adminRouter);
appRouter.use("/me", userRouter);
appRouter.use("/businesses", businessesRouter);
appRouter.use("/payment-methods", paymentMethodsRouter);
appRouter.use("/categories", categoriesRouter);
export default appRouter;
