import { GraphQLString, GraphQLObjectType,GraphQLID, GraphQLInt, GraphQLList } from "graphql";
import { subscriptionType } from "./Subscribe";

export const userType = new GraphQLObjectType({
    name:"user",
    fields:() => ({
        id:{ type:GraphQLID},
        username:{ type:GraphQLString},
        firstname:{ type:GraphQLString},
        lastname:{ type:GraphQLString},
        email:{ type:GraphQLString},
        password:{ type:GraphQLString},
        mobile:{ type:GraphQLInt},
        role:{ type:GraphQLInt},
        subscribe:{ type:new GraphQLList(subscriptionType)}
    })
})