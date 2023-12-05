import express from "express";
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
import { listBusinessReservations } from "./api/business-bookings.js";
import {
  businessDetails,
  createNewBusiness,
  listBusinesses,
} from "./api/businesses.js";
import { listCategories } from "./api/categories.js";
import { listPaymentMethods } from "./api/payment-methods.js";
import { listReservations } from "./api/reservations.js";
import { getCurrentUser, listUserBusinesses } from "./api/users.js";
import upload from "./middleware/multer.js";

const authRouter = express.Router();
authRouter.post("/signup", upload.single("photo"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

const adminRouter = express.Router();
adminRouter.get("/businesses", listAdminBusinesses);
adminRouter.post("/businesses/:id/approve", approveBusiness);
adminRouter.post("/businesses/:id/deny", denyBusiness);
adminRouter.get("/unapproved-businesses", listUnapprovedBusinesses);
adminRouter.get("/users", listUsers);

const userRouter = express.Router();
userRouter.get("/", getCurrentUser);
userRouter.get("/reservations", listReservations);
userRouter.get("/businesses", listUserBusinesses);

const businessesRouter = express.Router();
businessesRouter.get("/", listBusinesses);
businessesRouter.post("/", upload.array("images[]"), createNewBusiness);
businessesRouter.get("/:id", businessDetails);
businessesRouter.get("/:id/reservations", listBusinessReservations);

const paymentMethodsRouter = express.Router();
paymentMethodsRouter.get("/", listPaymentMethods);

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
