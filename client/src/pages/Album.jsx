import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import SearchBar from "../components/SearchBar";
import GoBack from '../components/GoBack';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';

const Album = (
) => {
    const { idAlbum } = useParams();

    const { loading: reviewsLoading, data: reviewsData, refetch: refetchReviews } = useQuery(QUERY_REVIEWS, {
        variables: { idAlbum: idAlbum },
      });

    console.log('idAlbum', idAlbum)

    const { data: albumData, loading: albumLoading, error: albumError } = useQuery(QUERY_ALBUM_BY_ID, {
        variables: { idAlbum: idAlbum },
    });

    const handleUpdateReview = async () => {
        refetchReviews();
      }
    

    if (albumLoading) {
        return <div>Loading...</div>;
    }

    if (albumError) {
        return <div>Error! {albumError.message}</div>;
    }

    return (
        <>
            <SearchBar />
            <div className="flex justify-center">
                <div className="inline-block w-full h-auto max-w-xs p-4 m-10 text-white rounded bg-white/30 album-details">
                    <h2>{albumData.getAlbumById.strAlbum}</h2>
                    <div>{albumData.getAlbumById.intYearReleased}</div>
                    <img className="w-[400px]" src={albumData.getAlbumById.strAlbumThumb} alt={`${albumData.getAlbumById.strArtist} - ${albumData.getAlbumById.strAlbum}`} />
                    <div>
                        {/* <button onClick={handleBuyClick}>Add Album to Cart</button> */}
                    </div>
                </div>
            </div>
            <div>
                <AddReview idAlbum={idAlbum} onAdd={handleUpdateReview}/>
                {reviewsData.reviews.map((review) => (
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