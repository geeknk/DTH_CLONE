import express from "express";
export const subscriptionRouter = express.Router();
import * as controller from "../controllers/subscriptionController";
import * as mid from "../middlewares/userMiddle"

subscriptionRouter.post("/:id", mid.checkAuth, controller.subscribe)