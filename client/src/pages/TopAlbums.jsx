import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { useQuery } from '@apollo/client';
import { QUERY_GET_TOP_ALBUMS } from '../utils/queries';
import { useEffect } from 'react';
import './TopAlbums.css';




const TopAlbums = () => {

    const { loading, error, data } = useQuery(QUERY_GET_TOP_ALBUMS);

    useEffect(() => {
    }, [data]);

    const handleAlbumClick = (album) => {
        window.location.assign(`/album/${album.idAlbum}`);
      };

    return (
        <>

<div className="add-margin-top">
      <SearchBar />
      </div>
            <div className="container">
                <div className="">
                    <div className="">
                        <h1 className="title">Top Reviewed Albums</h1>
                        <div className="">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div id="top-albums-container">
                                {data.getTopAlbums.map((album, index) => (
                                    <div key={album.idAlbum} className="style-albums" onClick={() => handleAlbumClick(album)}>
                                        <div className="number">#{index+1}</div>
                                        <h3>{album.strArtist}</h3>
                                        <div>{album.strAlbum}</div>
                                        <div>{album.intYearReleased}</div>
                                        <img src={album.strAlbumThumb !== null ? album.strAlbumThumb : defaultPic} alt={`${album.strArtist} - ${album.strAlbum}`} />
                                    </div>
                                ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default TopAlbums;