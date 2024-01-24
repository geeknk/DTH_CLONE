import * as userServices from "../services/userServices";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    await userServices.usersignup(req.body);
    res
      .status(201)
      .send({ success: true, msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  const loggedin = await userServices.token(req.body);
  if (!loggedin) {
    return res
      .status(401)
      .send({ success: false, msg: "error to build token" });
  } else {
    // Assigning refresh token in http-only cookie
    res.cookie("refresh_token", loggedin.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send(loggedin.accessToken);
  }
};

export const allSubscription = async (req: Request, res: Response) => {
  try {
    const data = await userServices.allSubscription(req.body.id);
    res.status(201).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await userServices.deleteUser(req.body.id);
    res.status(201).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await userServices.getAllUsers();
    res.status(201).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = await userServices.updateUser(req.body.id,req.body);
    res.status(201).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
