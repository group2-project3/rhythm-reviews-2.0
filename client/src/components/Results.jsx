import React, { useState } from "react";


const Results = (props) => {

    const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleAlbumClick = (album) => {
    window.location.assign(`/album/${album.idAlbum}`);
    setSelectedAlbum(album);
  };

  return (
    <>
        <div className="search-container">
          {props.data && props.data.getAlbumsByArtist && (
            <>
              {props.data.getAlbumsByArtist.map((album) => (
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
    </>
  );
};

export default Results;