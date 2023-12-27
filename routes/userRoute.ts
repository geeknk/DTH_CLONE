import express from "express";
export const userRouter = express.Router();
import * as mid from "../middlewares/userMiddle";
import * as controller from "../controllers/userController";

userRouter.post("/auth/register", mid.verifyEmail, controller.signup)
userRouter.post("/auth/signin", mid.loginMiddileware, controller.signin)
userRouter.get("/all-subscription", mid.checkAuth, controller.allSubscription)
userRouter.get("/all-users", mid.checkAuth, mid.isAdmin, controller.getAllUsers)
userRouter.delete("/auth/delete", mid.checkAuth, controller.deleteUser)