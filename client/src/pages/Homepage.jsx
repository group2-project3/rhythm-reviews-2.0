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
          <div className="text-5xl text-white font-bold blurry-text">RHYTHM</div>
          <div className="relative">
            <div className="text-5xl text-white font-bold mb-0">REVIEWS</div>
            <div className="bottom-0 left-0 right-0">
              <div className="text-5xl text-blue-500 font-bold opacity-50 reflected-text">
                <span className="clipped-text">REVIEWS</span>
              </div>
            </div>
          </div>
      
          <div className="max-w-400px mx-auto lg:w-2/3">
            <h1 className="text-3xl text-white text-shadow mb-12 ml-5 mr-5 lg:ml-0 lg:mr-0">
            Our platform is for music enthusiasts to explore their favorite artists and albums, by sharing reviews and engaging in meaningful discussions about their favorite albums.
          </h1>
        </div>
        </div>
        <div className="items-center justify-center">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Homepage;



