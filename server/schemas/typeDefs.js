const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedReviews: [Review]!
}

type Review {
    _id: ID
    title: String
    content: String
    user: User
    album_id: Int
    date: String
}

type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateReview(input: ReviewInput!): Review
  }

input ReviewInput {
  id: Int!
  title: String
  content: String
}

`;

module.exports = typeDefs;