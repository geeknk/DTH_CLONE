import { GraphQLInt, GraphQLString } from "graphql";
import * as userServices from "../../../services/userServices";
import { userType } from "../types/User";
import { User } from "../../../entity/user";
import bcrypt from "bcryptjs";

export const CREATE_USER = {
  type: userType,
  args: {
    username: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    mobile: { type: GraphQLString },
    role: { type: GraphQLInt },
  },
  async resolve(parent: any, args: User) {
    try {
      const isExits = await userServices.fetchUserData(args.email);
      if (isExits) return null;

      args.password = await bcrypt.hash(args.password, 10);
      return await userServices.usersignup(args);
    } catch (error) {
      return null;
    }
  },
};

export const LOGIN_USER = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(parents: any, args: User) {
    try {
      const userData = await userServices.fetchUserData(args.email);
      if (!userData) return "User Not Found";

      if (!(await bcrypt.compare(args.password, userData.password)))
        return "unauthorize";
      const token = await userServices.token(userData)
      return token.accessToken
    } catch (error: any) {
      return error.message;
    }
  },
};

export const DELETE_USER = {
  type: userType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent: any, args: User) {
    return userServices.deleteUser(args.id);
  },
};
