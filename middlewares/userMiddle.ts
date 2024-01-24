import { Request, Response, NextFunction } from "express";
import { fetchUserData } from "../services/userServices";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config/constant";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = await fetchUserData(req.body.email);

  if (userData)
    return res.status(409).send({ success: false, msg: "Email already exist" });

  req.body.password = await bcrypt.hash(req.body.password, 10);
  next();
};

export const loginMiddileware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = await fetchUserData(req.body.email);

  if (userData == null)
    return res.status(403).send("user not found please register first");

  if (!(await bcrypt.compare(req.body.password, userData.password)))
    return res.status(404).send("email or password does not match");

  req.body.id = userData.id;
  req.body.username = userData.username;

  next();
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const { email, id } = (await jwt.verify(token,config.ACCESS_TOKEN_SECRET as Secret)) as JwtPayload;
    console.log(id);

    req.body = { email, token, id };
    next();
  } else {
    return res.status(409).send({ success: false, msg: "invalid token" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await fetchUserData(req.body.id);
  console.log(user);
  
  if (user!.role == 1) {
    next();
  } else {
    res.status(403).send({ success: false, message: "not admin" });
  }
};
export const isOperator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await fetchUserData(req.body.email);
  console.log(user);
  
  if (user?.role == 2) {
    next();
  } else {
    res.status(403).send({ success: false, message: "not operator" });
  }
};
