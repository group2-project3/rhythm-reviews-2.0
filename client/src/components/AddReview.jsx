//AddReview component allows users to add a review to an album. 
//It is used in Album.jsx and Results.jsx.
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';
import '../assets/css/style.css';
import Modal from 'react-modal';
import '../assets/css/modal.css';

const AddReview = ({ idAlbum, onAdd, selectedRating }) => {
  const [addReview] = useMutation(CREATE_REVIEW);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(selectedRating || 0);
  const [hoveredRating, setHoveredRating] = useState(null); // State to track hovered rating
  
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const token = Auth.getToken();

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

  const handleAddReview = async (event) => {
    event.preventDefault();

    if (!token) {
      // Redirect to login if not logged in
      openModal('You must be logged in to add a review.');
      return;
    }

    try {
      await addReview({
        variables: { title: reviewTitle, content: reviewContent, rating: rating, idAlbum: idAlbum },
      });

      // Clear the form
      setReviewTitle('');
      setReviewContent('');
      setRating(0);

      // Trigger the callback to refetch the album data
      if (onAdd) {
        onAdd();
      }
      openModal('', 'Review added successfully.');
    } catch (error) {
      openModal('An error occurred while adding the review. You must add a title, description, and star rating to submit a review.', '')
    }
  };

  return (
    <div>
      <div className="center-container">
        <div className="review-form adjust-width">
          {token ? (
            <>
              <label htmlFor="review-title" className="style-title text-white">
                Add Your Review Here
              </label>
              <input
                id="review-title"
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="form-input-box"
                placeholder="Title your review"
              />
              <textarea
                id="review-content"
                maxLength="1000"
                rows="4"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="form-input-box"
                placeholder="Your thoughts on the album..."
              ></textarea>
              <div className="center-container-between">
                <div>
                  <StarRating rating={rating} onRatingChange={setRating} onHoverRatingChange={setHoveredRating} initialRating={selectedRating} />
                </div>
                <div className="add-margin-submit-button edit-review-adjust-ml-auto">
                  <button
                    id="submit-review"
                    className="add-review add-review-button"
                    type="submit"
                    onClick={handleAddReview}
                  >
                    Add Review
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="links center-container">
              <a href="/login">Login to leave a review</a>
            </p>
          )}
        </div>
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
      <Modal
        isOpen={modalIsOpen && !!modalSuccessMessage}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        className="modal-overlay"
      >
        <div className="modal-container">
          <h3 className="model-h-tag">Success</h3>
          <div className="model-div">
            <p className="model-text">
              {modalSuccessMessage}
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
  );
};

export default AddReview;