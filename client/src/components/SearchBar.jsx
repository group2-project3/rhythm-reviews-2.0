import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import Logout from "../components/Logout";
import { useLocation } from 'react-router-dom';
import '../assets/css/style.css';
import Modal from "react-modal";
import '../assets/css/modal.css';


const SearchBar = () => {
  const [artistName, setArtistName] = useState("");
  const [logged_in] = useState(Auth.loggedIn());
  const location = useLocation();
  const currentPage = location.pathname;

  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (errorMessage, successMessage) => {
    setModalIsOpen(true);
    setModalErrorMessage(errorMessage);
    setModalSuccessMessage(successMessage);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalErrorMessage('');
    setModalSuccessMessage('');
  };

  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    if (!artistName) {
      openModal("Artist name is empty. Please enter an artist name.");
      return;
    }

    window.location.assign(`/results?artistName=${artistName}`);
  };

  const handleTopSearch = (event) => {

    window.location.assign(`/topalbums`)
  };


  return (
    <>
      <div className="search-flex-container">
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
          <div className="search-button-container">
            <button className="search-button" type="submit">
              Search
            </button>
            <button className="search-button" type="button" onClick={handleTopSearch}>
              Top Albums
            </button>
          </div>
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
        <Modal
        isOpen={modalIsOpen && !!modalErrorMessage}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="modal-overlay"
      >
        <div className="modal-container">
          <h3 className="model-h-tag">Oops</h3>
          <div className="model-div">
            <p className="model-text">
              {modalErrorMessage}
            </p>
          </div>
          <div className="model-update-div">
            <button
              onClick={closeModal}
              className="close-button model-button"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      </div>
    </>
  )
}

export default SearchBar;