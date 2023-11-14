import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import SearchBar from '../components/SearchBar';
import GoBack from '../components/GoBack';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';
import defaultPic from '../assets/defaultPic.png';

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
      <SearchBar />


      
      <div className="flex flex-col items-center lg:flex-row lg:justify-center">
        <div className="grid album-mobile" style={{ width: '380px' }}>
          <h1 className="text-2xl text-center text-white md:ml-auto lg:text-right">{albumData.getAlbumById.strArtist}</h1>
          <div className="ml-auto text-white d-none d-lg-block">
            <p className="pt-2 text-right">{albumData.getAlbumById.strAlbum}</p>
            <p className="pt-2 text-right">{albumData.getAlbumById.strLabel}</p>
            <p className="pt-2 text-right">{albumData.getAlbumById.strStyle}</p>
          </div>
        </div>
        <div className="inline-block w-full h-auto max-w-xs p-4 m-10 text-white rounded bg-white/30 album-details" style={{ width: '380px' }}>
          <h2>{albumData.getAlbumById.strAlbum}</h2>
          <div>{albumData.getAlbumById.intYearReleased}</div>
          <img
            className="w-[400px]"
            src={albumData.getAlbumById.strAlbumThumb !== null ? albumData.getAlbumById.strAlbumThumb : defaultPic}
            alt={`${albumData.getAlbumById.strArtist} - ${albumData.getAlbumById.strAlbum}`}
          />
        </div>
        <div className="p-4 text-white lg:w-1/3 d-none d-lg-block" style={{ width: '380px' }}>
          <p>
            {isExpanded
              ? albumData.getAlbumById.strDescriptionEN
              : `${albumData.getAlbumById.strDescriptionEN?.slice(0, 250)}...`}
          </p>
          {!isExpanded && (
            <button onClick={() => setIsExpanded(true)} className="text-blue-500 hover:underline">
              Read More
            </button>
          )}
          {isExpanded && (
            <button onClick={() => setIsExpanded(false)} className="text-blue-500 hover:underline">
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
