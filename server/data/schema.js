import {
  makeExecutableSchema,
} from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type UserProfile {
    id: ID!
    firstName: String
    lastName: String
  }

  type User {
    id: ID!
    username: String
    email: String
    profile: UserProfile
  }

  type JsonWebToken {
    token: String
    error: String
  }

  type Query {
    user(username: String, id: Int): User
    userProfile(id: Int!): UserProfile
    viewer: User
  }

  type Mutation {
    createToken(username: String!, password: String!): JsonWebToken
    updateUserProfile(id: Int!, firstName: String, lastName: String): UserProfile
    createUser(username: String!, email: String!, password: String!): User
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
