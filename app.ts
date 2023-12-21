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
import postmanToOpenApi from 'postman-to-openapi'
import path from "path"
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/005/user", userRouter)
app.use("/005/plan", planRouter)
app.use("/005/subscription", subscriptionRouter)
app.use("/005/channel", channelRouter)

postmanToOpenApi(
    "config/DTH.postman_collection.json",
    path.join("config/swagger.yml"),
    {defaultTag:"General"}
).then((response)=>{
    let result=YAML.load("config/swagger.yml");
    result.servers[0].url="/";
    app.use("/swagger",swaggerUi.serve, swaggerUi.setup(result));
})

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