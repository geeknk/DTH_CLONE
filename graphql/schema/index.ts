import {GraphQLObjectType, GraphQLSchema} from "graphql"
import { GET_ALL_SUBSCRIPTION, GET_ALL_USERS, GET_SINGLE_USERS } from "./queries/User"
import { CREATE_USER, DELETE_USER } from "./mutations/User"
import { SUBSCRIBE_PLAN } from "./mutations/Subscribe"
import { CREATE_CHANNEL } from "./mutations/Channel"
import { GET_ALL_PLANS } from "./queries/Plan"
import { GET_ALL_CHANNELS } from "./queries/Channel"
import { ADD_PLAN, DELETE_PLAN } from "./mutations/Plan"


const Query = new GraphQLObjectType({
    name:"Query",
    fields:{
      getAllUsers: GET_ALL_USERS,
      getSingleUser: GET_SINGLE_USERS,
      getAllsubscription: GET_ALL_SUBSCRIPTION,
      getAllPlans: GET_ALL_PLANS,
      getAllChannels: GET_ALL_CHANNELS,
    }
  })

  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
      createUser:CREATE_USER,
      deleteUser:DELETE_USER,
      subscribePlan:SUBSCRIBE_PLAN,
      createChannel:CREATE_CHANNEL,
      addPlan:ADD_PLAN,
      deletePlan:DELETE_PLAN,
    }
  })

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})