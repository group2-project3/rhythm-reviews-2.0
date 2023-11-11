import React from "react";

import SearchBar from "../components/SearchBar";

const Homepage = () => {
  

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
        </div>
    </>
  );
};

export default Homepage;