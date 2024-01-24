import { GraphQLID, GraphQLString } from "graphql";
import * as userServices from "../../../services/userServices";
import { planType } from "../types/Plan";
import { Plan } from "../../../entity/plan";

export const ADD_PLAN = {
  type: planType,
  args: {
    category: { type: GraphQLString },
    price: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
  resolve(parent: any, args: Plan) {
    return userServices.addPlan(args);
  },
};

export const DELETE_PLAN = {
  type: planType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent: any, args: Plan) {
    return userServices.deletePlan(args.id);
  },
};
