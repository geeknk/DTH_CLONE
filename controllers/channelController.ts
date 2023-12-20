import * as userServices from "../services/userServices"
import {Request,Response} from "express"

export const allChannel = async (req:Request, res:Response) => {
    try {    
      const data = await userServices.allChannels() 
      res.status(201).send({ success: true, data})
    } catch (error) {
      console.log(error);
    }
};
export const addChannel = async (req:Request, res:Response) => {
    try {    
      const data = await userServices.addChannel(req.body) 
      res.status(201).send({ success: true, data})
    } catch (error) {
      console.log(error);
    }
};
export const deleteChannel = async (req:Request, res:Response) => {
    const id = req.params
    try {    
      const data = await userServices.deleteChannel(+id) 
      res.status(201).send({ success: true, data})
    } catch (error) {
      console.log(error);
    }
};
  