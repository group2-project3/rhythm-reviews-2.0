import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import { useState } from 'react';

const Album = (
) => {
    const { idAlbum } = useParams();

    console.log('idAlbum', idAlbum)

    const { data, loading, error, refetch } = useQuery(QUERY_ALBUM_BY_ID, {
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
            <div className="album-details">
                {/* {<button onClick={onGoBack}>Go Back</button>} */}
                <h2>{data.getAlbumById.strAlbum}</h2>
                <div>{data.getAlbumById.intYearReleased}</div>
                <img src={data.getAlbumById.strAlbumThumb} alt={`${data.getAlbumById.strArtist} - ${data.getAlbumById.strAlbum}`} />
                <div>
                    {/* <button onClick={handleBuyClick}>Add Album to Cart</button> */}
                </div>
            </div>
        </>
    );
};

export default Album;