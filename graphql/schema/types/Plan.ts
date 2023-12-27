import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
  } from "graphql";
import { channelType } from "./Channel";
  
  export const planType = new GraphQLObjectType({
    name: "plan",
    fields: () => ({
      id: { type: GraphQLID },
      category: { type: GraphQLString },
      duration: { type: GraphQLString },
      price: { type: GraphQLString },
      expiryDate: { type: GraphQLString },
      channels: { type:new GraphQLList(channelType) }
    }),
  });