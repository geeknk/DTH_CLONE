import config from "../config/constant"
import { DataSource } from "typeorm"
import {User} from "../entity/user"
import {Plan} from "../entity/plan"
import {Subscription} from "../entity/subscription"
import {Channel} from "../entity/channel"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: config.PASS,
    database: config.DB,
    entities: [User,Plan,Subscription,Channel],
    synchronize: true,
    logging: false,
})