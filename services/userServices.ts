import {AppDataSource} from "../config/dbConnection"
import jwt from "jsonwebtoken"
import config from "../config/constant"
import randToken from "rand-token"
import {client} from "../config/redisconfig";
import {User} from "../entity/user"
import {Plan} from "../entity/plan"
import {Channel} from "../entity/channel";
import {Subscription} from "../entity/subscription";

const userRepository = AppDataSource.getRepository(User)
const planRepository = AppDataSource.getRepository(Plan)
const channelRepository = AppDataSource.getRepository(Channel)
const subscribeRepository = AppDataSource.getRepository(Subscription)

export const usersignup = async (data: User) : Promise<User | null> => {  
    const newUser = await userRepository.create(data)
    return await userRepository.save(newUser)
};

export const fetchUserData = async (email: string) : Promise<User | null> => {
  return await userRepository.findOne({where:{email}})
};

export const deleteUser = async (id:number) : Promise<void> => {
  await userRepository.delete({id})
};

export const plans = async () : Promise<Plan[] | null> => {
  return await planRepository.find({
    relations: {
      channels: true,
    },
  })
};

export const addPlan = async (data: Plan) : Promise<Plan | null> => {
  const newPlan = await planRepository.create(data)
  return await planRepository.save(newPlan)
};
export const deletePlan = async (id:number) : Promise<void> => {
  await planRepository.delete({id})
};

export const addChannel = async (data:Channel) : Promise<Channel | null> => {
  const newPlan = await channelRepository.create(data)
  return await channelRepository.save(newPlan)
};

export const allChannels = async () : Promise<Channel[] | null> => {
  return await channelRepository.find()
};

export const deleteChannel = async (id:number) : Promise<void> => {
  await channelRepository.delete({id})
};

const expires = async (id:number) => {
  const data = await planRepository.findOne({where:{id}})
  const num:number = +data!.duration[0]
  const monthOrYear = data!.duration[1]

  const currentDate = new Date();

// Add 1 month to the current date
const expiryDate = new Date(currentDate);

(monthOrYear == "Year")?(expiryDate.setFullYear(currentDate.getFullYear() + num)):(expiryDate.setMonth(currentDate.getMonth() + num))

// Format the dates as strings for better readability
const currentDateStr = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
const expiryDateStr = expiryDate.toISOString().split('T')[0];   // Format as YYYY-MM-DD

return {currentDate, expiryDate}
}

export const subscribedPlan = async (planId:number,userId:number) : Promise<Subscription | null> => { 
  
  const expiry = expires(planId)

  const subscribe = subscribeRepository.create(
    Object.assign(new Subscription(), {
    startDate: (await expiry).currentDate,
    expiryDate:(await expiry).expiryDate,
    plans: planId,
    user: userId
    })
  )
  return await subscribeRepository.save(subscribe)
};

export const allSubscription = async (id:number) : Promise<User | null> => { 

  return await userRepository.findOne({
    where:{id},
    relations: {
      subscribe: true,
    },
  })
};

export const token = async (userData: {
  id: number;
  username: string;
  email: string;
}) => {
  const accessToken = jwt.sign(
    { email: userData.email, id: userData.id, username: userData.username },
    config.ACCESS_TOKEN_SECRET as jwt.Secret,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES }
  );
  const refreshToken = randToken.uid(256);

  // code for redis to store refresh token

  await client.hSet(refreshToken, {
    id: userData.id,
    email: userData.email,
    username: userData.username,
  });
  return { accessToken, refreshToken };
};