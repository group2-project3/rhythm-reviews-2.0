import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import Logout from "../components/Logout";
import GoBack from "../components/GoBack";
import { useLocation } from 'react-router-dom';
import '../assets/css/style.css';


const SearchBar = () => {
  const [artistName, setArtistName] = useState("");
  const [logged_in] = useState(Auth.loggedIn());
  const location = useLocation();
  const currentPage = location.pathname;

  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    console.log('searching ', artistName)
    window.location.assign(`/results?artistName=${artistName}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <form id="search-form" onSubmit={handleSearch} action="/api/reviews/artist-search" method="GET">
          <input
            id="search-input"
            className="search-box"
            type="text"
            name="artistName"
            value={artistName}
            onChange={(e) => {
              setArtistName(e.target.value)
            }}
            placeholder="Search your favorite artist..."
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="search-container"></div>
        <div className="link-box">
          {logged_in ? (
            <>
              <p className="links">
                <a href={currentPage === '/profile' ? '/' : '/profile'}>
                  {currentPage === '/profile' ? 'Home' : 'Profile'}
                </a>
              </p>
              <p className="right-space">or</p>
              <p className="links">
                <Logout />
              </p>
            </>
          ) : (
            <>
              <p className="links">
                <a href="/login">Login</a>
              </p>
              <p className="right-space">or</p>
              <p className="links">
                <a href="/createacct">Create Account</a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchBar;