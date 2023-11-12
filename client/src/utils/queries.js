import { gql } from '@apollo/client';

// query to get user profile
export const userProfileQuery = gql`
query GetUserProfile {
    getUserProfile {
      _id
      username
      email
      savedReviews {
        _id
        title
        content
        idAlbum
        date
        user {
          _id
          username
          email
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

  // query to get an album by id
  export const QUERY_ALBUM_BY_ID = gql`
    query getAlbumById($idAlbum: ID!) {
      getAlbumById(idAlbum: $idAlbum) {
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
  query GetReviews($idAlbum: ID!) {
    reviews(idAlbum: $idAlbum) {
      _id
      title
      content
      idAlbum
      date
      user {
        _id
        username
        email
      }
    }
  }
`;