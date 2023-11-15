import React from 'react';
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const iconSize = 30; // You can adjust the size according to your preference

  return (
    <>
      <div className="footer-container">
        <footer className="footer-fixed-position">
          <div className="footer-flex-center">
            <a href="https://github.com/group2-project3/rhythm-reviews-2.0" target="_blank" rel="noopener noreferrer" className="white-font-color">
              <FaGithub size={iconSize}
              />
            </a>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" className="white-font-color">
              <FaFacebook size={iconSize} />
            </a>
            <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer" className="white-font-color">
              <FaTwitter size={iconSize} />
            </a>
            <a href="https://www.instagram.com/your-instagram-account" target="_blank" rel="noopener noreferrer" className="white-font-color">
              <FaInstagram size={iconSize} />
            </a>
            <a href="mailto:your-email@example.com" className="text-white">
              <FaEnvelope size={iconSize} />
            </a>
          </div>
          <p className="footer-margin">
            © 2023 Rhythm Reviews Site, developed by Jen Stemkowski, Ashley Zemina, Gilberto Rosario, Jason Torrealba, Florian Kreuk
          </p>
        </footer>
      </div>
    </>
  );
};

export default Footer