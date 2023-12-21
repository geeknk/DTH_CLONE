import express from "express";
export const channelRouter = express.Router();
import * as controller from "../controllers/channelController";
import * as mid from "../middlewares/userMiddle";

channelRouter.post("/add", mid.checkAuth, mid.isOperator, controller.addChannel)
channelRouter.get("/get", mid.checkAuth, controller.allChannel)
channelRouter.delete("/delete", mid.checkAuth, mid.isOperator, controller.deleteChannel)
