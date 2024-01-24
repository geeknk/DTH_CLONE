import * as userServices from "../services/userServices";
import { Request, Response } from "express";

export const subscribe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userServices.subscribedPlan(+id, req.body.id);
    res
      .status(201)
      .send({ success: true, msg: "User subscribed plan = " + id });
  } catch (error) {
    console.log(error);
  }
};
