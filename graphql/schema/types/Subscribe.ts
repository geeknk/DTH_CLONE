import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { planType } from "./Plan";

export const subscriptionType = new GraphQLObjectType({
  name: "subscribe",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLInt },
    planId: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    expiryDate: { type: GraphQLString },
    plan: { type: new GraphQLList(planType) },
    // user:{ type:new GraphQLList(userType)}
  }),
});
