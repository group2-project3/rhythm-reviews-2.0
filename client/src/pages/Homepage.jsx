import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import '../assets/css/style.css';

const Homepage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const fadeInClass = fadeIn ? "fade-in" : "";

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-80">
        <div className={`text-center ${fadeInClass}`} >
          <h1 className="text-3xl text-white text-shadow">
            Our platform is for music enthusiasts to explore their favorite artists and albums,
          </h1>
          <h2 className="mb-12 text-3xl text-white text-shadow">
            by sharing reviews and engaging in meaningful discussions about their favorite albums.
          </h2>
        </div>
        <div className="items-center justify-center">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Homepage;



