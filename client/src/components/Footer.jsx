import React from 'react';
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const iconSize = 30; // You can adjust the size according to your preference

  return (
    <>
      <div className="flex flex-col items-center justify-between mt-64">
        <footer className="fixed bottom-0 items-center w-full py-4 text-center text-white bg-gray-800">
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/group2-project3/rhythm-reviews-2.0" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaGithub size={iconSize}
              />
            </a>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaFacebook size={iconSize} />
            </a>
            <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaTwitter size={iconSize} />
            </a>
            <a href="https://www.instagram.com/your-instagram-account" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaInstagram size={iconSize} />
            </a>
            <a href="mailto:your-email@example.com" className="text-white">
              <FaEnvelope size={iconSize} />
            </a>
          </div>
          <p className="mt-4">
            © 2023 Rhythm Reviews Site, developed by Jen Stemkowski, Ashley Zemina, Gilberto Rosario, Jason Torrealba, Florian Kreuk
          </p>
        </footer>
      </div>
    </>
  );
};

export default Footer