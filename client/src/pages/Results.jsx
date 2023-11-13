import React, { useState } from "react";
import { QUERY_ALBUMS_BY_ARTIST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import SearchBar from "../components/SearchBar";
import { useLocation } from 'react-router-dom';
import GoBack from "../components/GoBack";
import '../assets/css/style.css';
import defaultPic from '../assets/defaultPic.png';

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
      <div className="fixed top-0 left-0 z-10 w-full p-4 bg-white/50">
        <SearchBar />
      </div>
      <div className="mt-48 search-container"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mr-2.5">
          {data && data.getAlbumsByArtist && (
            data.getAlbumsByArtist.map((album) => (
              <div key={album.idAlbum} className="p-4 mb-4 text-white bg-white/30 rounded-xl hover:scale-110 hover:bg-blue-600 hover:bg-opacity-80 album-search-result cursor-pointer" onClick={() => handleAlbumClick(album)}>
                <h3>{album.strArtist}</h3>
                <div>{album.strAlbum}</div>
                <div>{album.intYearReleased}</div>
                <img src={album.strAlbumThumb !== null ? album.strAlbumThumb : defaultPic} alt={`${album.strArtist} - ${album.strAlbum}`} />
              </div>
            ))
          )}
        </div>
        {props.message && <p className="text-red-600">{props.message}</p>}
      </div>
      <GoBack />
    </>
  );
};

export default Results;