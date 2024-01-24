import { GraphQLList, GraphQLString } from "graphql";
import * as userServices from "../../../services/userServices";
import { planType } from "../types/Plan";

export const GET_ALL_PLANS = {
  type: new GraphQLList(planType),
  async resolve() {
    return await userServices.plans();
  },
};