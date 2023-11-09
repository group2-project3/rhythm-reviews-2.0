import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALBUMS_BY_ARTIST } from '../utils/queries';
import Results from "../components/Results";

const Homepage = () => {
  const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("");
  const [logged_in, setLoggedIn] = useState(false);

  const { data, loading, error, refetch } = useQuery(QUERY_ALBUMS_BY_ARTIST, {
    variables: { artistName: artistName },
  });

  useEffect(() => {
    if (error) {
      setMessage("Error fetching data.");
    }
  }, [error]);

  const handleSearch = (event) => {
    event.preventDefault();

    console.log('searching ', artistName)
    refetch();
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center mt-64">
        <h1 className="text-2xl text-center text-white text-shadow">
          Our platform is for music enthusiasts to explore their favorite artists and albums,
        </h1>
        <h2 className="text-2xl text-center text-white mb-11 text-shadow">
          by sharing reviews and engaging in meaningful discussions about their favorite albums.
        </h2>

        <form id="search-form" onSubmit={handleSearch} className="content-center text-center" action="/api/reviews/artist-search" method="GET">
        <input
          id="search-input"
          className="p-2.5 w-[300px]"
          type="text"
          name="artistName"
          value={artistName}
          onChange={(e) => {
            setArtistName(e.target.value)
          }}
          placeholder="Search your favorite artist..."
        />
        <button className="text-white py-2.5 px-2.5 rounded border-2 border-white hover:bg-blue-700" type="submit">
          Search
        </button>
      </form>

      <Results data={data} message={message} />

      {/* {data && data.getAlbumsByArtist && (
  <div className="search-container">
    {data.getAlbumsByArtist.map((album) => (
      <div key={album.idAlbum}>
        <h3>{album.strArtist}</h3>
        <div>{album.strAlbum}</div>
        <div>{album.intYearReleased}</div>
        <img src={album.strAlbumThumb} alt={`${album.strArtist} - ${album.strAlbum}`} />
      </div>
          ))}
          {message && (
            <p className="text-red-600">{message}</p>
          )}
            </div>
        )} */}

        <div className="search-container"></div>
        <div className="flex items-center justify-center mt-4">
          {logged_in ? (
            <>
              <p className="text-white underline break-words mr-1.5 hover-text-blue-700 underline-offset-1">
                <a href="/profile">Profile</a>
              </p>
              <p className="text-blue-600"></p>
              <p className="text-white break-words mr-1.5">or</p>
              <p className="text-white underline hover-text-blue-700 underline-offset-1">
                <a href="/api/users/logout">Logout</a>
              </p>
            </>
          ) : (
            <>
              <p className="text-white underline break-words mr-1.5 hover-text-blue-700 underline-offset-1">
                <a href="/login">Login</a>
              </p>
              <p className="text-blue-600"></p>
              <p className="text-white break-words mr-1.5">or</p>
              <p className="text-white underline hover-text-blue-700 underline-offset-1">
                <a href="/createacct">Create Account</a>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between min-h-screen mt-64">
        <footer className="fixed bottom-0 items-center w-full py-4 text-center text-white bg-gray-800">
          © 2023 Rhythm Reviews Site, developed by Jen Stemkowski, Ashley Zemina, Gilberto Rosario, Jason Torrealba
        </footer>
      </div>
    </>
  );
};

export default Homepage;