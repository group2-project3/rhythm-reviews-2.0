import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, UPDATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';
import Helpers from '../utils/helpers';

const EditReview = (props) => {
  const [updatedReviewTitle, setUpdatedReviewTitle] = useState('');
  const [updatedReviewContent, setUpdatedReviewContent] = useState('');
  const [updatedRating, setUpdatedRating] = useState(props.review.rating);
  const [editing, setEditing] = useState(false);

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);

  const handleEditReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setUpdatedReviewTitle(props.review.title);
      setUpdatedReviewContent(props.review.content);
      setUpdatedRating(props.review.rating);
      setEditing(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelEditReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setEditing(false);
      // Handle any logic after canceling the edit if needed
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteReview({
        variables: { reviewId },
      });
      props.onDelete();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updateReview({
        variables: { id: reviewId, title: updatedReviewTitle, content: updatedReviewContent, rating: updatedRating },
      });
      setEditing(false);
      // Handle any logic after updating the review if needed
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {props.review.user?.username === (Auth.loggedIn() ? Auth.getProfile()?.data.username : null) ? (
          <>
            {editing ? (
              <div className="review-form w-[450px]">
                <div key={props.review._id} className="mt-4 text-lg text-white">
                  <div className="px-5 py-5 mt-1 text-black bg-white border-2 border-blue-600 rounded-md">
                    <p className="mb-2 ml-5">Username: {props.review.user?.username}</p>
                    <p className="mb-2 ml-5">Date: {Helpers.formatDate(props.review.date)}</p>
                    <form>
                      <label htmlFor="edit-review-title" className="block mb-2 text-sm font-medium text-white text-gray-900">
                        Review Title
                      </label>
                      <input
                        id="edit-review-title"
                        type="text"
                        value={updatedReviewTitle}
                        onChange={(e) => setUpdatedReviewTitle(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={props.review.title}
                      />
                      <textarea
                        id="edit-review-content"
                        maxLength="1000"
                        rows="4"
                        value={updatedReviewContent}
                        onChange={(e) => setUpdatedReviewContent(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                        placeholder={props.review.content}
                      ></textarea>
                      <div className="mt-3">
                        <p className="block mb-2 text-sm font-medium text-white text-gray-900">
                          Your Rating: {updatedRating}
                        </p>
                        <StarRating rating={updatedRating} onRatingChange={setUpdatedRating} />
                      </div>
                    </form>
                  </div>
                </div>
                <button
                  className="delete-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700 mt-3"
                  onClick={() => handleCancelEditReview(props.review._id)}
                >
                  Cancel
                </button>
                <button
                  className="delete-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700 mt-3"
                  onClick={() => handleDeleteReview(props.review._id)}
                >
                  Delete Review
                </button>
                <button
                  className="update-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-green-600 hover:bg-green-700 mt-3"
                  onClick={() => handleUpdateReview(props.review._id)}
                >
                  Update Review
                </button>
              </div>
            ) : (
              <div className="review-form w-[450px]">
                <div key={props.review._id} className="mt-4 text-lg text-white">
                  <div className="px-5 py-5 mt-1 text-black bg-white border-2 border-blue-600 rounded-md">
                    {/* Optional chaining and nullish coalescing added here */}
                    {props.displayThumbnail && album?.getAlbumById && (
                      <a href={`/album/${album.getAlbumById.idAlbum}`}>
                        <img
                          className="w-[400px]"
                          src={album.getAlbumById.strAlbumThumb}
                          alt={`${album.getAlbumById.strArtist} - ${album.getAlbumById.strAlbum}`}
                        />
                      </a>
                    )}
                    <p className="mb-2 ml-5">Username: {props.review.user?.username}</p>
                    <p className="mb-2 ml-5">Date: {Helpers.formatDate(props.review.date)}</p>
                    <p className="mb-2 ml-5">Review Title: {props.review.title}</p>
                    <p className="mb-2 ml-5">Review: {props.review.content}</p>
                    <div className="mt-3">
                      <p className="block mb-2 text-sm font-medium text-white text-gray-900">
                        Your Rating: {updatedRating}
                      </p>
                      <StarRating rating={updatedRating} readOnly />
                    </div>
                  </div>
                </div>
                <button
                  className="update-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-green-600 hover:bg-green-700 mt-3"
                  onClick={() => handleEditReview(props.review._id)}
                >
                  Edit Review
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="review-form w-[450px]">
            <div key={props.review._id} className="mt-4 text-lg text-white">
              <div className="px-5 py-5 mt-1 text-black bg-white border-2 border-blue-600 rounded-md">
                {props.displayThumbnail && album?.getAlbumById && (
                  <img
                    className="w-[400px]"
                    src={album.getAlbumById.strAlbumThumb}
                    alt={`${album.getAlbumById.strArtist} - ${album.getAlbumById.strAlbum}`}
                  />
                )}
                <p className="mb-2 ml-5">Username: {props.review.user?.username}</p>
                <p className="mb-2 ml-5">Date: {Helpers.formatDate(props.review.date)}</p>
                <p className="mb-2 ml-5">Review Title: {props.review.title}</p>
                <p className="mb-2 ml-5">Review: {props.review.content}</p>
                <p className="mb-2 ml-5">Rating: {props.review.rating}</p>
                <StarRating rating={props.review.rating} readOnly />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditReview;