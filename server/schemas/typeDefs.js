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
    idAlbum: Int
    date: String
    user: User
}

type Query {
  users: [User]
  getUserProfile: User
  reviews(idAlbum: ID!): [Review]
  review(reviewId: ID!): Review
  me: User
  getAlbumsByArtist(artistName: String!): [Album]
  getAlbumById(idAlbum: ID!): Album
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
  logoutUser: Boolean
  updatePassword(currentPassword: String!, newPassword: String!, confirmPassword: String!): Auth
  createReview(title: String!, content: String!, idAlbum: ID!): Review
  updateReview(input: ReviewInput!): Review
  deleteReview(reviewId: ID!): Review
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