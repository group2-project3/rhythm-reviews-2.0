//Single album page
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import SearchBar from '../components/SearchBar';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';
import defaultPic from '../assets/DefaultPic.png';
import { Link } from 'react-router-dom';
import './Album.css';

const Album = () => {
  const { idAlbum } = useParams();

  const { loading: reviewsLoading, data: reviewsData, refetch: refetchReviews } = useQuery(QUERY_REVIEWS, {
    variables: { idAlbum: idAlbum },
  });

  const { data: albumData, loading: albumLoading, error: albumError } = useQuery(QUERY_ALBUM_BY_ID, {
    variables: { idAlbum: idAlbum },
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const [selectedRating, setSelectedRating] = useState(0);

  const handleUpdateReview = (rating) => {
    refetchReviews();
    setSelectedRating(rating);
  };

  if (albumLoading) {
    return <div>Loading...</div>;
  }

  if (albumError) {
    return <div>Error! {albumError.message}</div>;
  }

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
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>REVIEWS</Link>
            </div>
            <div className="alignment">
              <div className="blue-review-text reflected-text">
                <span className="clipped-text" style={{ fontSize: '34px' }}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>REVIEWS</Link>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex-container">
        <div className="add-grid album-mobile" style={{ width: '380px' }}>
          <h1 className="style-album-data top-space">{albumData.getAlbumById.strArtist}</h1>
          <p className="style-album-subdata">{albumData.getAlbumById.strAlbum}</p>
          <p className="style-album-subdata">{albumData.getAlbumById.strLabel}</p>
          <p className="style-album-subdata">{albumData.getAlbumById.strStyle}</p>
        </div>
        <div className="style-album-details album-details">
          <h2>{albumData.getAlbumById.strAlbum}</h2>
          <div>{albumData.getAlbumById.intYearReleased}</div>
          <img
            className="adjust-img-width"
            src={albumData.getAlbumById.strAlbumThumb !== null ? albumData.getAlbumById.strAlbumThumb : defaultPic}
            alt={`${albumData.getAlbumById.strArtist} - ${albumData.getAlbumById.strAlbum}`}
          />
        </div>
        <div className="style-text" style={{ width: '380px' }}>
          <p className="overflow-text">
            {albumData.getAlbumById.strDescriptionEN
              ? isExpanded
                ? albumData.getAlbumById.strDescriptionEN
                : `${albumData.getAlbumById.strDescriptionEN.slice(0, 250)}...`
              : ''}
          </p>
          {albumData.getAlbumById.strDescriptionEN && !isExpanded && (
            <button onClick={() => setIsExpanded(true)} className="read-more-less">
              Read More
            </button>
          )}
          {isExpanded && (
            <button onClick={() => setIsExpanded(false)} className="read-more-less">
              Read Less
            </button>
          )}
        </div>
      </div>
      <div>
        <AddReview idAlbum={idAlbum} onAdd={handleUpdateReview} selectedRating={selectedRating} />
        {reviewsData?.reviews.map((review) => (
          <EditReview key={review._id} review={review} onDelete={handleUpdateReview} />
        ))}
      </div>
    </>
  );
};


export default Album;
