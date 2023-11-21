import express from "express";
import { login, signup } from "./api/auth.js";
import { listUsers } from "./api/users.js";
import { listBusinesses } from "./api/businesses.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

const usersRouter = express.Router();
usersRouter.get("/", listUsers);

const businessesRouter = express.Router();
businessesRouter.get("/", listBusinesses);

const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/businesses", businessesRouter);
export default appRouter;



