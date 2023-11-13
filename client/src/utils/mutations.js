import { gql } from '@apollo/client';


// user registration mutation
export const REGISTER_USER = gql`
mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
          email
        }
    }
}
`;

//user login mutation
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        token
        user {
          _id
          username
          email
        }
    }
}
`;

export const LOGOUT_USER = gql`
mutation {
  logoutUser
}
`;

// Create Review mutation
export const CREATE_REVIEW = gql`
  mutation createReview($title: String!, $content: String!, $idAlbum: ID!, $rating: Int!) {
    createReview(title: $title, content: $content, idAlbum: $idAlbum, rating: $rating) {
      _id
      title
      content
      idAlbum
      rating
      date
    }
  }
`;

//update review mutation
export const UPDATE_REVIEW = gql`
mutation updateReview($id: ID!, $title: String!, $content: String!) {
    updateReview(id: $id, title: $title, content: $content) {
        _id
        title
        content
        date
    }
}
`;

//update password mutation
export const UPDATE_PASSWORD = gql`
mutation updatePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
      token
        user {
          _id
          username
          email
        }
    }
  }
`;

// delete review mutation
export const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      _id
      title
      content
      user {
        _id
        username
        email
      }
      idAlbum
      date
    }
  }
`;

// delete account mutation
export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($password: String!) {
    deleteAccount(password: $password) {
      success
      message
    }
  }
`;