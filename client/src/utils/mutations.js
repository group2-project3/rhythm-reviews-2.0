import { gql } from '@apollo/client';

// user registration mutation
export const REGISTER_USER = gql`
mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
        id
        username
        email
    }
}
`;

//user login mutation
export const LOGIN_USER = gql`
mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
        id
        username
        email
    }
}
`;

//create review mutation
export const CREATE_REVIEW = gql`
mutation CreateReview($title: String!, $content: String!, $album_id: ID!) {
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
mutation UpdateReview($id: ID!, $title: String!, $content: String!) {
    updateReview(id: $id, title: $title, content: $content) {
        id
        title
        content
    }
}
`;


