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
export const QUERY_ALBUMS = gql`
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
export const QUERY_ALBUMS_BY_ARTIST = gql`
  query SearchAlbums($artistName: String!) {
    getAlbumsByArtist(artistName: $artistName) {
      idAlbum
    strArtist
    strAlbum
    intYearReleased
    strAlbumThumb
    }
  }
  `;

// query to get all reviews
export const QUERY_REVIEWS = gql`
  query GetReviews($username: String) {
    reviews(username: $username) {
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
