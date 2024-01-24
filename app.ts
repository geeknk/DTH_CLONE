import express from "express";
import { userRouter } from "./routes/userRoute";
import { planRouter } from "./routes/planRoute";
import { channelRouter } from "./routes/channelRoute";
import { subscriptionRouter } from "./routes/subscriptionRoute";
import cookieParser from "cookie-parser";
import { redisconnect } from "./config/redisconfig";
import { AppDataSource } from "./config/dbConnection";
import "reflect-metadata";
import config from "./config/constant";
import postmanToOpenApi from "postman-to-openapi";
import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema/index";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/subscription", subscriptionRouter);
app.use("/channel", channelRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

postmanToOpenApi(
  "config/DTH.postman_collection.json",
  path.join("config/swagger.yml"),
  { defaultTag: "General" }
).then((response) => {
  let result = YAML.load("config/swagger.yml");
  result.servers[0].url = "/";
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(result));
});

export const initializeDB = AppDataSource.initialize()
  .then(() => {
    console.log("DB connected")
    redisconnect()
    app.listen(config.PORT, () => {
    console.log("server is running", config.PORT);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });
