import { GraphQLInt, GraphQLString } from "graphql"
import * as userServices from "../../../services/userServices"
import { userType } from "../types/User"
import { User } from "../../../entity/user";

export const CREATE_USER = {
    type:userType,
    args:{
        username:{ type:GraphQLString},
        firstname:{ type:GraphQLString},
        lastname:{ type:GraphQLString},
        email:{ type:GraphQLString},
        password:{ type:GraphQLString},
        mobile:{ type:GraphQLInt},
        role:{ type:GraphQLInt}
    },
    resolve(parent:any, args: User){
        return userServices.usersignup(args)
    }
}

export const DELETE_USER = {
    type:userType,
    args:{
        id:{ type:GraphQLInt}
    },
    resolve(parent:any, args: User){
        return userServices.deleteUser(args.id)
    }
}