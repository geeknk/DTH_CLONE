import express from "express";
export const planRouter = express.Router();
import * as controller from "../controllers/planController";
import * as mid from "../middlewares/userMiddle";

planRouter.post("/add",mid.checkAuth, mid.isOperator, controller.addPlans)
planRouter.get("/all", mid.checkAuth, controller.allPlans);
planRouter.delete("/delete/:id",mid.checkAuth, mid.isOperator, controller.deletePlan);
