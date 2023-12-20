import express from "express";
export const channelRouter = express.Router();
import * as controller from "../controllers/channelController";
import * as mid from "../middlewares/userMiddle";

channelRouter.post("/add", mid.isOperator, controller.addChannel)
channelRouter.get("/get", mid.isOperator, controller.allChannel);
channelRouter.post("/delete", mid.isOperator, controller.deleteChannel);
