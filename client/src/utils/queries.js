import { gql } from '@apollo/client';

// query to get user profile
export const userProfileQuery = gql`
query GetUserProfile {
    getUserProfile {
      id
      username
      email
      reviews {
        id
        title
        content
        album {
          id
          name
        }
      }
    }
  }
`;

// query to get all reviews for a user
export const albumReviewsQuery = gql`
  query GetAlbumReviews($albumId: ID!) {
    getAlbumReviews(albumId: $albumId) {
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

// query to get all albums
export const getAlbumsQuery = gql`
  query GetAlbums {
    getAlbums {
      id
      name
      artist
      year
    }
  }
  `;

// query to get all albums by artist
export const searchAlbumsQuery = gql`
  query SearchAlbums($query: String!) {
    searchAlbums(query: $query) {
      id
      name
      artist
      year
    }
  }
  `;





