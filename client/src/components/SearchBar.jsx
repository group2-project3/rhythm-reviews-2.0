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
                <button className="ml-1 text-white py-2.5 px-2.5 rounded border-2 border-solid border-white hover:bg-blue-700" type="submit">
                    Search
                </button>
            </form>
            <div className="search-container"></div>
        <div className="flex items-center justify-center mt-4">
          {logged_in ? (
            <>
              <p className="text-white underline break-words mr-1.5 hover-text-blue-700 underline-offset-1">
                <a href="/profile">Profile</a>
              </p>
              <p className="text-blue-600"></p>
              <p className="text-white break-words mr-1.5">or</p>
              <p className="text-white underline cursor-pointer hover-text-blue-700 underline-offset-1">
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
        </>
    )
}

export default SearchBar;