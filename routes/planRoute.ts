import express from "express";
export const planRouter = express.Router();
import * as controller from "../controllers/planController";
import * as mid from "../middlewares/userMiddle";

planRouter.post("/add", mid.isOperator, controller.addPlans)
planRouter.get("/all", controller.allPlans);
planRouter.delete("/delete/:id", mid.isOperator, controller.deletePlan);
