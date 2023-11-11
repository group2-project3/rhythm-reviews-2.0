import React, { useState, useEffect } from "react";



const SearchBar = () => {
    const [artistName, setArtistName] = useState("");

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
                <button className="ml-1 text-white py-2.5 px-2.5 rounded border-2 border-white hover:bg-blue-700" type="submit">
                    Search
                </button>
            </form>
        </>
    )
}

export default SearchBar;