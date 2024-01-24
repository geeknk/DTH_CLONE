import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const channelType = new GraphQLObjectType({
  name: "channel",
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    name: { type: GraphQLString },
    planId: { type: GraphQLInt },
  }),
});
