import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';
import '../assets/css/style.css';

const AddReview = ({ idAlbum, onAdd, selectedRating }) => {
  const [addReview] = useMutation(CREATE_REVIEW);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(selectedRating || 0);
  const [hoveredRating, setHoveredRating] = useState(null); // State to track hovered rating
  const token = Auth.getToken();

  const handleAddReview = async (event) => {
    event.preventDefault();

    if (!token) {
      // Redirect to login if not logged in
      console.log('User is not logged in. Redirect to login page or show a login modal.');
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
    } catch (error) {
      console.error(error);
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
                  {/* <p className="white-font-color">Rating: {hoveredRating !== null ? hoveredRating : rating}</p> */}
                  <StarRating rating={rating} onRatingChange={setRating} onHoverRatingChange={setHoveredRating} initialRating={selectedRating} />
                </div>
                <div className="add-flex-center left-space">
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
    </div>
  );
};

export default AddReview;