import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';
import PropTypes from 'prop-types';


const Results = (props) => {
    // const { loading, data } = useQuery(QUERY_REVIEWS);
    // const reviews = data?.reviews || [];
    // const [addReview] = useMutation(ADD_REVIEW);
    // const logged_in = Auth.loggedIn();
    // const [reviewAlbum, setReviewAlbum] = useState('');

    // const handleAddReview = async (event) => {
    //     event.preventDefault();
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const { data } = await addReview({
    //             variables: { reviewAlbum }
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

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
      {/* Add more details as needed */}
    </div>
  );
};

export default Results;