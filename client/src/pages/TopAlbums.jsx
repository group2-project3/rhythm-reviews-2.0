// Shows the top 4 rated/popular albums
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
             <div>
        <div className="results-container">
          <SearchBar />
          <div className="style-rhythm-reviews-text blurry-text" style={{ position: 'absolute', top: 10, left: 10, fontSize: '34px' }}>RHYTHM</div>
          <div className="relative" style={{ position: 'absolute', top: 40, left: 10 }}>
            <div className="style-rhythm-reviews-text remove-margin-bottom" style={{ fontSize: '34px' }}>REVIEWS</div>
            <div className="alignment">
              <div className="blue-review-text reflected-text">
                <span className="clipped-text" style={{ fontSize: '34px' }}>REVIEWS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
            <div className="margin-space">
                        <h1 className="title">Top Reviewed Albums</h1>
                        <div >
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div id="top-albums-container">
                                    {data.getTopAlbums.map((album, index) => (
                                        <div key={album.idAlbum} className="style-albums" onClick={() => handleAlbumClick(album)}>
                                            <div className="number">#{index + 1}</div>
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
            <Footer />
        </>
    )
};

export default TopAlbums;