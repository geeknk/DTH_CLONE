import express from "express"
import {userRouter} from "./routes/userRoute"
import {planRouter} from "./routes/planRoute"
import {channelRouter} from "./routes/channelRoute"
import {subscriptionRouter} from "./routes/subscriptionRoute"
import cookieParser from "cookie-parser"
import {redisconnect} from"./config/redisconfig"
import { AppDataSource } from "./config/dbConnection"
import "reflect-metadata"
import config from "./config/constant"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/user",userRouter)
app.use("/plan",planRouter)
app.use("/subscription",subscriptionRouter)
app.use("/channel",channelRouter)

AppDataSource.initialize()
.then(()=>{
    console.log("DB connected");
}).catch((error)=>{
    console.log(error);
})

redisconnect();

app.listen(config.PORT,()=>{
    console.log("server is running", config.PORT);
})