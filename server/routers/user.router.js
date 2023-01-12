import { Router } from "express";
import { createUser, login } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/", login);
userRouter.post("/register", createUser);
