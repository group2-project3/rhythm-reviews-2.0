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

type Query {
  users: [User]
  user(username: String!): User
  reviews(username: String): [Review]
  review(reviewId: ID!): Review
  me: User
  getAlbumsByArtist(artistName: String!): [Album]
  getAlbumById(id: ID!): Album
}

type Album {
  idAlbum: ID!
  strAlbum: String
  strArtist: String
  intYearReleased: String
  strAlbumThumb: String
}

type Mutation {
  registerUser(username: String!, email: String!, password: String!): Auth
  loginUser(email: String!, password: String!): Auth
  updatePassword(oldPassword: String!, newPassword: String!, confirmPassword: String!): User
  createReview(content: String!): Review
  updateReview(input: ReviewInput!): Review
  removeReview(reviewId: ID!): Review
}

type Auth {
  token: ID!
  user: User
}

input ReviewInput {
  id: Int!
  title: String
  content: String
}

`;

module.exports = typeDefs;