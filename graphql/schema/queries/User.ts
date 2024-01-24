import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { userType } from "../types/User";
import * as userServices from "../../../services/userServices";
import { User } from "../../../entity/user";

export const GET_ALL_USERS = {
  type: new GraphQLList(userType),
  resolve() {
    return userServices.getAllUsers();
  },
};

export const GET_SINGLE_USERS = {
  // type: new GraphQLList(userType),
  type: userType,
  args: {
    email: { type: GraphQLString },
  },
  resolve(parent: any, args: User) {
    return userServices.fetchUserData(args.email);
  },
};

export const GET_ALL_SUBSCRIPTION = {
  // type: new GraphQLList(userType),
  type: userType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent: any, args: User) {
    return userServices.allSubscription(args.id);
  },
};
