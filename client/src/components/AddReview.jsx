import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';

const AddReview = ({ idAlbum, onAdd, selectedRating }) => {
  const [addReview] = useMutation(CREATE_REVIEW);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(selectedRating || 0); 
  const token = Auth.getToken();

  const handleAddReview = async (event) => {
    event.preventDefault();

    if (!token) {
      console.log('User is not logged in. Redirect to login page or show a login modal.');
      return;
    }

    try {
      await addReview({
        variables: { title: reviewTitle, content: reviewContent, rating: rating, idAlbum: idAlbum },
      });
      setReviewTitle('');
      setReviewContent('');
      setRating(0);
      onAdd();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="review-form w-[450px]">
          {token ? (
            <>
              <label htmlFor="review-title" className="block mb-2 text-sm font-medium text-white text-gray-900">
                Add Your Review Here
              </label>
              <input
                id="review-title"
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title your review"
              />
              <textarea
                id="review-content"
                maxLength="1000"
                rows="4"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                placeholder="Your thoughts on the album..."
              ></textarea>
              <div className="mt-3">
                <p className="block mb-2 text-sm font-medium text-white text-gray-900">
                  Your Rating: {rating}
                </p>
                <StarRating rating={rating} onRatingChange={setRating} initialRating={selectedRating} />
              </div>
              <div className="add-flex-center">
                <button
                  id="submit-review"
                  className="add-review text-white text-lg py-2.5 px-4 rounded border-2 border-white bg-blue-600 hover:bg-blue-700 mt-2"
                  type="submit"
                  onClick={handleAddReview}
                >
                  Add Review
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-white underline break-words mr-14 hover:text-blue-700 underline-offset-1 ml-14">
              <a href="/login">Login to leave a review</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReview;