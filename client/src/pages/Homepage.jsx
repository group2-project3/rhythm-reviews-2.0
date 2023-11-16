//Hompage component for the site
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import '../assets/css/style.css';
import './Homepage.css';

const Homepage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const fadeInClass = fadeIn ? "fade-in" : "";

  return (
    <>
      <div className="home-container">

        <div className={`center-text ${fadeInClass}`} >
          <div className="style-rhythm-reviews-text blurry-text">RHYTHM</div>
          <div className="relative">
            <div className="style-rhythm-reviews-text remove-margin-bottom">REVIEWS</div>
            <div className="alignment">
              <div className="blue-review-text reflected-text">
                <span className="clipped-text">REVIEWS</span>
              </div>
            </div>
          </div>

          <div className="style-description-div">
            <h1 className="description-text">
            Our platform is for music enthusiasts to explore their favorite artists and albums, by sharing reviews and engaging in meaningful discussions about their favorite albums.
          </h1>
        </div>
        </div>
        <div className="center-homepage-div">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Homepage;
