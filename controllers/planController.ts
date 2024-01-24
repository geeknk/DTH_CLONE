import * as userServices from "../services/userServices";
import { Request, Response } from "express";

export const allPlans = async (req: Request, res: Response) => {
  try {
    const data = await userServices.plans();
    res.status(201).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
export const addPlans = async (req: Request, res: Response) => {
  try {
    const data = await userServices.addPlan(req.body);
    res.status(201).send({ success: true, message: "plan inserted", data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userServices.deletePlan(+id);
    res.status(201).send({ success: true, message: "plan deleted " + id });
  } catch (error) {
    console.log(error);
  }
};
