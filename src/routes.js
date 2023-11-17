import express from "express";
import { login, signup } from "./api/auth.js";
import { listUsers } from "./api/users.js";

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);

const usersRouter = express.Router();
usersRouter.get("/", listUsers);

const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/users", usersRouter);

export default appRouter;
