import { gql } from '@apollo/client';


// user registration mutation
export const REGISTER_USER = gql`
mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
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

//create review mutation
export const CREATE_REVIEW = gql`
mutation createReview($title: String!, $content: String!, $album_id: ID!) {
    createReview(title: $title, content: $content, album_id: $album_id) {
        id
        title
        content
      user {
            id
            username
        }
    }
}
`;

//update review mutation
export const UPDATE_REVIEW = gql`
mutation updateReview($id: ID!, $title: String!, $content: String!) {
    updateReview(id: $id, title: $title, content: $content) {
        id
        title
        content
    }
}
`;

//update password mutation
export const UPDATE_PASSWORD = gql`
mutation updatePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!, $email: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword, email: $email) {
      success
      message
    }
  }
`;

// add review mutation
export const ADD_REVIEW = gql`
  mutation AddReview($input: ReviewInput!) {
    createReview(input: $input) {
      _id
      title
      content
      user {
        _id
        username
        email
      }
      album_id
      date
    }
  }
`;

// delete review mutation
export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    removeReview(reviewId: $id) {
      _id
      title
      content
      user {
        _id
        username
        email
      }
      album_id
      date
    }
  }
`;


