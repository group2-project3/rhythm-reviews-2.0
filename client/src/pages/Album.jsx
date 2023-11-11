import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import SearchBar from "../components/SearchBar";
import GoBack from '../components/GoBack';
import Review from './Review';

const Album = (
) => {
    const { idAlbum } = useParams();

    console.log('idAlbum', idAlbum)

    const { data, loading, error } = useQuery(QUERY_ALBUM_BY_ID, {
        variables: { idAlbum: idAlbum },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    return (
        <>
            <SearchBar />
            <div className="flex justify-center">
                <div className="inline-block w-full h-auto max-w-xs p-4 m-10 text-white rounded bg-white/30 album-details">
                    {/* {<button onClick={onGoBack}>Go Back</button>} */}
                    <h2>{data.getAlbumById.strAlbum}</h2>
                    <div>{data.getAlbumById.intYearReleased}</div>
                    <img className="w-[400px]" src={data.getAlbumById.strAlbumThumb} alt={`${data.getAlbumById.strArtist} - ${data.getAlbumById.strAlbum}`} />
                    <div>
                        {/* <button onClick={handleBuyClick}>Add Album to Cart</button> */}
                    </div>
                </div>
            </div>
            <div>
                <Review idAlbum={idAlbum} />
            </div>
            <div>
                <GoBack />
            </div>
        </>
    );
};

export default Album;