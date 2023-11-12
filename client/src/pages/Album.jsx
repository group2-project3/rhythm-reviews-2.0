import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import SearchBar from '../components/SearchBar';
import GoBack from '../components/GoBack';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';

const Album = () => {
  const { idAlbum } = useParams();


  const { loading: reviewsLoading, data: reviewsData, refetch: refetchReviews } = useQuery(QUERY_REVIEWS, {
    variables: { idAlbum: idAlbum },
  });


  const { data: albumData, loading: albumLoading, error: albumError } = useQuery(QUERY_ALBUM_BY_ID, {
    variables: { idAlbum: idAlbum },
  });

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
                <div className="grid" style={{ width: '380px' }}>
                    <h1 className="text-2xl text-white md:ml-auto lg:text-right text-center">{albumData.getAlbumById.strArtist}</h1>
                    <div className="d-none d-lg-block text-white ml-auto">
                        <p className="text-right pt-2">{albumData.getAlbumById.strAlbum}</p>
                        <p className="text-right pt-2">{albumData.getAlbumById.strLabel}</p>
                        <p className="text-right pt-2">{albumData.getAlbumById.strStyle}</p>
                    </div>
                </div>
                <div className="inline-block w-full h-auto max-w-xs p-4 m-10 text-white rounded bg-white/30 album-details" style={{ width: '380px' }}>
                    <h2>{albumData.getAlbumById.strAlbum}</h2>
                    <div>{albumData.getAlbumById.intYearReleased}</div>
                    <img
                        className="w-[400px]"
                        src={albumData.getAlbumById.strAlbumThumb}
                        alt={`${albumData.getAlbumById.strArtist} - ${albumData.getAlbumById.strAlbum}`}
                    />
                    <div>{/* <button onClick={handleBuyClick}>Add Album to Cart</button> */}</div>
                </div>
                <div className="lg:w-1/3 p-4 d-none d-lg-block text-white" style={{ width: '380px' }}>
                    <p>{albumData.getAlbumById.strDescriptionEN}</p>
                </div>
            </div>
            <div>
                <AddReview idAlbum={idAlbum} onAdd={handleUpdateReview} />
                {reviewsData?.reviews.map((review) => (
                    <EditReview key={review._id} review={review} onDelete={handleUpdateReview} />
                ))}
            </div>
            <div>
                <GoBack />
            </div>
        </>
    );
};

export default Album;