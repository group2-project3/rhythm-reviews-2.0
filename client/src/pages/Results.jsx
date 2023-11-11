import React, { useState } from "react";
import { QUERY_ALBUMS_BY_ARTIST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import SearchBar from "../components/SearchBar";
import { useLocation } from 'react-router-dom';
import GoBack from "../components/GoBack";

const Results = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Access the value of a query parameter named 'example'
  const artistName = queryParams.get('artistName');

    const [selectedAlbum, setSelectedAlbum] = useState(null);


    const { data, loading, error, refetch } = useQuery(QUERY_ALBUMS_BY_ARTIST, {
        variables: { artistName: artistName },
      });


  const handleAlbumClick = (album) => {
    window.location.assign(`/album/${album.idAlbum}`);
    setSelectedAlbum(album);
  };

  return (
    <>
        <SearchBar />
        <div className="search-container">
          {data && data.getAlbumsByArtist && (
            <>
              {data.getAlbumsByArtist.map((album) => (
                <div key={album.idAlbum} onClick={() => handleAlbumClick(album)}>
                  <h3>{album.strArtist}</h3>
                  <div>{album.strAlbum}</div>
                  <div>{album.intYearReleased}</div>
                  <img src={album.strAlbumThumb} alt={`${album.strArtist} - ${album.strAlbum}`} />
                </div>
              ))}
            </>
          )}
          {props.message && <p className="text-red-600">{props.message}</p>}
        </div>
        <GoBack />
    </>
  );
};

export default Results;