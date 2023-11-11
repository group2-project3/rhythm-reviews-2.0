import React, { useState, useEffect } from "react";
// import { useQuery } from '@apollo/client';
// import { QUERY_ALBUMS_BY_ARTIST } from '../utils/queries';
import Results from "./Results";
import Auth from '../utils/auth';
import Logout from "../components/Logout";
import SearchBar from "../components/SearchBar";

const Homepage = () => {
  // const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("");
  const [logged_in, setLoggedIn] = useState(Auth.loggedIn());

  

  
  // const { data, loading, error, refetch } = useQuery(QUERY_ALBUMS_BY_ARTIST, {
  //   variables: { artistName: artistName },
  // });

  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);
  

  // useEffect(() => {
  //   if (error) {
  //     setMessage("Error fetching data.");
  //   }
  // }, [error]);

  return (
    <>
      <div className="mt-60 flex flex-col items-center justify-center mt-64">
        <h1 className="text-2xl text-center text-white text-shadow">
          Our platform is for music enthusiasts to explore their favorite artists and albums,
        </h1>
        <h2 className="text-2xl text-center text-white mb-11 text-shadow">
          by sharing reviews and engaging in meaningful discussions about their favorite albums.
        </h2>
        <SearchBar />
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
                <Logout />
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
    </>
  );
};

export default Homepage;