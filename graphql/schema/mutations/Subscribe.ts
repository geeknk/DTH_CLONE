import { GraphQLInt } from "graphql";
import * as userServices from "../../../services/userServices";
import { subscriptionType } from "../types/Subscribe";
import { Subscription } from "../../../entity/subscription";

export const SUBSCRIBE_PLAN = {
  type: subscriptionType,
  args: {
    plansId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  },
  resolve(parent: any, args: Subscription) {
    return userServices.subscribedPlan(args.plansId, args.userId);
  },
};
