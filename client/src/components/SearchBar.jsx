import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import Logout from "../components/Logout";


const SearchBar = () => {
    const [artistName, setArtistName] = useState("");
    const [logged_in] = useState(Auth.loggedIn());


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
                <a href="/profile">Profile</a>
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
        </>
    )
}

export default SearchBar;