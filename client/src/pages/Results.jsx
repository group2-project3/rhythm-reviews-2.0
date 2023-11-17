// This page displays the results of the search query. 
//It displays the artist name, album name, year released, and album cover. 
//It also displays the average rating for each album. The user can click on an album to view the album page.
import React, { useState, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import { QUERY_ALBUMS_BY_ARTIST, QUERY_REVIEWS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import SearchBar from "../components/SearchBar";
import { useLocation } from 'react-router-dom';
import defaultPic from '../assets/DefaultPic.png';
import StarRating from '../components/StarRating'; // Import the StarRating component
import './Results.css';
import { Link } from 'react-router-dom';

const Results = (props) => {
  const client = useApolloClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const artistName = queryParams.get('artistName');

  const { data: albumsData, loading: albumsLoading, error: albumsError, refetch: refetchAlbums } = useQuery(QUERY_ALBUMS_BY_ARTIST, {
    variables: { artistName: artistName },
  });

  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    const fetchAverageRatings = async () => {
      if (albumsData && albumsData.getAlbumsByArtist) {
        const albumIds = albumsData.getAlbumsByArtist.map(album => album.idAlbum);

        const ratingsPromises = albumIds.map(async (idAlbum) => {
          const { data } = await client.query({
            query: QUERY_REVIEWS,
            variables: { idAlbum: idAlbum },
          });

          const totalRatings = data.reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRatings / data.reviews.length || 0;

          return { idAlbum, averageRating };
        });

        const ratings = await Promise.all(ratingsPromises);

        const ratingsMap = {};
        ratings.forEach(({ idAlbum, averageRating }) => {
          ratingsMap[idAlbum] = averageRating;
        });

        setAverageRatings(ratingsMap);
      }
    };

    fetchAverageRatings();
  }, [albumsData, client]); // Include client in the dependency array

  const handleAlbumClick = (album) => {
    window.location.assign(`/album/${album.idAlbum}`);
  };

  return (
    <>
      <div>
        <div className="results-container">
          <SearchBar />
          <div className="style-rhythm-reviews-text blurry-text" style={{ position: 'absolute', top: 10, left: 10, fontSize: '34px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>RHYTHM</Link>
          </div>
          <div className="relative" style={{ position: 'absolute', top: 40, left: 10 }}>
            <div className="style-rhythm-reviews-text remove-margin-bottom" style={{ fontSize: '34px' }}>
              <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>REVIEWS</Link>
            </div>
            <div className="alignment">
              <div className="blue-review-text reflected-text">
                <span className="clipped-text" style={{ fontSize: '34px' }}>
                  <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>REVIEWS</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="margin">
        <h1 className="title">Album Results</h1>
        <div className="search-container">
          <div className="add-flex-container">
            {albumsData && albumsData.getAlbumsByArtist && (
              albumsData.getAlbumsByArtist.map((album) => (
                <div key={album.idAlbum} className="style-albums" onClick={() => handleAlbumClick(album)}>
                  <h3>{album.strArtist}</h3>
                  <div>{album.strAlbum}</div>
                  <div>{album.intYearReleased}</div>
                  <img src={album.strAlbumThumb !== null ? album.strAlbumThumb : defaultPic} alt={`${album.strArtist} - ${album.strAlbum}`} />

                  {/* Display the average rating using the StarRating component */}
                  <StarRating
                    rating={averageRatings[album.idAlbum] || 0}
                    readOnly={true}
                  />
                </div>
              ))
            )}
          </div>
          {props.message && <p className="red-warning-text">{props.message}</p>}
        </div>
      </div>
    </>
  );
};

export default Results;