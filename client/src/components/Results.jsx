import React, { useState } from "react";


const Results = (props) => {

    const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleGoBack = () => {
    setSelectedAlbum(null);
  };

  return (
    <>
      {!selectedAlbum ? (
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
      ) : (
        <AlbumDetails album={selectedAlbum} onGoBack={handleGoBack} />
      )}
    </>
  );
};

const AlbumDetails = ({ album, onGoBack }) => {
  return (
    <div className="album-details">
      <button onClick={onGoBack}>Go Back</button>
      <h2>{album.strAlbum}</h2>
      <div>{album.intYearReleased}</div>
      <img src={album.strAlbumThumb} alt={`${album.strArtist} - ${album.strAlbum}`} />
    </div>
  );
};

export default Results;