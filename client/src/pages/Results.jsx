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
      <div className="results-container">
        <SearchBar />
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