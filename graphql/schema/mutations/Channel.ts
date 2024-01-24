import { GraphQLInt, GraphQLString } from "graphql";
import * as userServices from "../../../services/userServices";
import { Channel } from "../../../entity/channel";
import { channelType } from "../types/Channel";

export const CREATE_CHANNEL = {
  type: channelType,
  args: {
    category: { type: GraphQLString },
    name: { type: GraphQLString },
    planId: { type: GraphQLInt },
  },
  resolve(parent: any, args: Channel) {
    return userServices.addChannel(args);
  },
};

export const DELETE_CHANNEL = {
  type: channelType,
  args: {
    id: { type: GraphQLString },
  },
  resolve(parent: any, args: Channel) {
    return userServices.deleteChannel(args.id);
  },
};
