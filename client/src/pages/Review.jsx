import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';
import Helpers from '../utils/helpers';

const Review = ({ idAlbum }) => {
  const { loading, data, refetch } = useQuery(QUERY_REVIEWS, {
    variables: { idAlbum: idAlbum },
  });

  const [addReview] = useMutation(CREATE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [updatedReviewTitle, setUpdatedReviewTitle] = useState('');
  const [updatedReviewContent, setUpdatedReviewContent] = useState('');
  const [editing, setEditing] = useState([]);


  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);



  const handleAddReview = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addReview({
        variables: { title: reviewTitle, content: reviewContent, idAlbum: idAlbum },
      });
      refetch();
      // Handle any logic after adding the review if needed
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setEditing((prevEditing) => [...prevEditing, reviewId]);
      // Handle any logic after updating the review if needed
    } catch (e) {
      console.error(e);
    }
  }

  const handleCancelEditReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setEditing((prevEditing) => prevEditing.filter((id) => id !== reviewId));
      // Handle any logic after updating the review if needed
    } catch (e) {
      console.error(e);
    }
  }


  const handleDeleteReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteReview({
        variables: { reviewId },
      });
      refetch();
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
        variables: { id: reviewId, title: updatedReviewTitle, content: updatedReviewContent },
      });
      setEditing((prevEditing) => prevEditing.filter((id) => id !== reviewId));
      // Handle any logic after updating the review if needed
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <div className="flex justify-center">
        <div className="review-form w-[450px]">
          {Auth.loggedIn() ? (
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

      {data.reviews.map((review) => (
        <div className="flex justify-center">
          {(review.user?.username === Auth.getProfile().data.username) ?
            <>
              {editing.includes(review._id) ?
                <>

                  <div className="review-form w-[450px]">
                    <div key={review._id} className="mt-4 text-white text-lg">
                      <div className="px-5 py-5 mt-1 bg-white border-2 border-blue-600 rounded-md text-black">
                        <p className="mb-2 ml-5">Username: {review.user?.username}</p>
                        <p className="mb-2 ml-5">Date: {Helpers.formatDate(review.date)}</p>
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
                            placeholder={review.title}
                          />
                          <textarea
                            id="edit-review-content"
                            maxLength="1000"
                            rows="4"
                            value={updatedReviewContent}
                            onChange={(e) => setUpdatedReviewContent(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                            placeholder={review.content}
                          ></textarea>
                        </form>
                      </div>
                    </div>
                  </div>
                  <button
                    className="delete-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700 mt-3"
                    onClick={() => handleCancelEditReview(review._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="delete-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700 mt-3"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    Delete Review
                  </button>
                  <button
                    className="update-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-green-600 hover:bg-green-700 mt-3"
                    onClick={() => handleUpdateReview(review._id)}
                  >
                    Update Review
                  </button>
                </> : <>
                  <div className="review-form w-[450px]">
                    <div key={review._id} className="mt-4 text-white text-lg">
                      <div className="px-5 py-5 mt-1 bg-white border-2 border-blue-600 rounded-md text-black">
                        <p className="mb-2 ml-5">Username: {review.user?.username}</p>
                        <p className="mb-2 ml-5">Date: {Helpers.formatDate(review.date)}</p>
                        <p className="mb-2 ml-5">Title: {review.title}</p>
                        <p className="mb-2 ml-5">Review: {review.content}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="update-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-green-600 hover:bg-green-700 mt-3"
                    onClick={() => handleEditReview(review._id)}
                  >
                    Edit Review
                  </button>
                </>
              }
            </> : <>

              <div className="review-form w-[450px]">
                <div key={review._id} className="mt-4 text-white text-lg">
                  <div className="px-5 py-5 mt-1 bg-white border-2 border-blue-600 rounded-md text-black">
                    <p className="mb-2 ml-5">Username: {review.user?.username}</p>
                    <p className="mb-2 ml-5">Date: {Helpers.formatDate(review.date)}</p>
                    <p className="mb-2 ml-5">Title: {review.title}</p>
                    <p className="mb-2 ml-5">Review: {review.content}</p>
                  </div>
                </div>
              </div>
            </>}
        </div>
      ))}
    </div>
  );
};

export default Review;