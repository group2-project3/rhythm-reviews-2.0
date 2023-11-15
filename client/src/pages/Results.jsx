import React, { useState } from "react";
import { QUERY_ALBUMS_BY_ARTIST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import SearchBar from "../components/SearchBar";
import { useLocation } from 'react-router-dom';
// import '../assets/css/style.css';
import defaultPic from '../assets/defaultPic.png';
import './Results.css';

const Results = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const artistName = queryParams.get('artistName');

  const { data, loading, error, refetch } = useQuery(QUERY_ALBUMS_BY_ARTIST, {
    variables: { artistName: artistName },
  });

  const handleAlbumClick = (album) => {
    window.location.assign(`/album/${album.idAlbum}`);
  };

  return (
    <>
      <div className="results-container">
      <SearchBar />
      </div>
      <div className="margin-space search-container">
        <div className="add-flex-container">
          {data && data.getAlbumsByArtist && (
            data.getAlbumsByArtist.map((album) => (
              <div key={album.idAlbum} className="style-albums" onClick={() => handleAlbumClick(album)}>
                <h3>{album.strArtist}</h3>
                <div>{album.strAlbum}</div>
                <div>{album.intYearReleased}</div>
                <img src={album.strAlbumThumb !== null ? album.strAlbumThumb : defaultPic} alt={`${album.strArtist} - ${album.strAlbum}`} />
              </div>
            ))
          )}
        </div>
        {props.message && <p className="red-warning-text">{props.message}</p>}
      </div>
    </>
  );
};

export default Results;