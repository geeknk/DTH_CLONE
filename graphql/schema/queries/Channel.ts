import {GraphQLList} from "graphql"
import * as userServices from "../../../services/userServices"
import { channelType } from "../types/Channel"

export const GET_ALL_CHANNELS ={
    type: new GraphQLList(channelType),
    async resolve() {
        // console.log(await userServices.plans());
        return await userServices.allChannels()
    }
}

export const DELETE_CHANNEL ={
    type: new GraphQLList(channelType),
    async resolve() {
        // console.log(await userServices.plans());
        return await userServices.allChannels()
    }
}