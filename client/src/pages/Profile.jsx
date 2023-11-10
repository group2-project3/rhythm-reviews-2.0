import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { UPDATE_PASSWORD, DELETE_REVIEW, UPDATE_REVIEW } from '../utils/mutations';
import { userProfileQuery } from '../utils/queries';

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, error, data } = useQuery(userProfileQuery);
  const user = data?.getUserProfile;
  const reviews = user?.reviews || [];
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);

  const handlePasswordChange = async (event,) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updatePassword({
        variables: { currentPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword, },
      });
      alert('Password updated successfully!');

    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again!');
    }
  };

  const handleUpdateReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updateReview({
        variables: { reviewId },
      });

    } catch (err) {
      console.error(err);
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

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="inline-block w-4/5 max-w-lg p-5 mt-10 text-center rounded bg-white/30 shadow-white-30">
      <div className="text-black">
        <div className="text-black">
          <h1 className="mb-5 text-center text-white">User Profile </h1>
          <div className="mb-10">
            <h2 className="text-2xl text-white">Welcome, { user?.username }!</h2>
            <p className="text-white">Email: { user?.email }</p>
          </div>
          <form onSubmit={handlePasswordChange}>
            <h2 className="mb-3 text-white">Change Password</h2>
            <div className="mb-3 text-left form-group">
              <label htmlFor="currentPassword" className="mb-1 text-white">Current Password:</label>
              <input 
                type="password" 
                id="currentPassword" 
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                required />
            </div>
            <div className="mb-3 text-left">
              <label htmlFor="newPassword" className="mb-1 text-white">New Password:</label>
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                required />
            </div>
            <div className="mb-3 text-left">
              <label htmlFor="confirmPassword" className="mb-1 text-white">Confirm New Password:</label>
              <input 
                type="password"
                id="confirmPassword" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                required />
            </div>
            <button type="submit"
              className="mb-5 text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700">Save
              New Password</button>
          </form>
          <div className="mt-5">
            <h2 className="mb-2 text-2xl text-white">Your Album Reviews</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review.dataValues.id} className="p-2.5 rounded border-2 mb-5 bg-white album-review" data-review-id={review.dataValues.id}>
                  <p className="mb-2 ml-5">Date of Review: {dataValues.date}</p>
                  <img src="{{strAlbumThumb}}" alt="{{strAlbum}}" />
                  <p className="mb-2 ml-5"><strong><u>Album Title:</u></strong> {dataValues.title}</p>
                  <p className="mb-2 ml-5"><strong><u>Review:</u></strong> {dataValues.content}</p>
                  <button href="#" onClick={() => handleDeleteReview(review.reviewId)} className="delete-review-link" data-review-id="{{dataValues.id}}">
                    <span
                      className="box-border inline-block w-20 px-1 py-1 mt-2 mr-3 text-xs text-white transition-colors duration-300 ease-in-out bg-blue-600 border-2 border-black rounded hover:bg-blue-700 h-51">Delete</span>
                  </button>

                  <div>
                    <div id="update-review-form-{{dataValues.id}}" className="hidden">
                      <input id="review-title-{{dataValues.id}}" type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5"
                        placeholder="Title your review" />
                      <textarea id="review-content-{{dataValues.id}}" maxlength="1000" rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                        placeholder="Your thoughts on the album..."></textarea>
                      <button id="save-review-{{dataValues.id}}" type="button"
                        className="box-border inline-block w-20 px-1 py-1 mt-2 mt-5 mr-3 text-xs text-white transition-colors duration-300 ease-in-out bg-blue-600 border-2 border-black rounded hover:bg-blue-700 h-51"
                        onclick="saveUpdatedReview({{dataValues.id}})">Save</button>
                      <button id="cancel-review-{{dataValues.id}}" type="button"
                        className="box-border inline-block w-20 px-1 py-1 mt-2 mr-3 text-xs text-white transition-colors duration-300 ease-in-out bg-blue-600 border-2 border-black rounded hover:bg-blue-700 h-51"
                        onclick="cancelUpdateReview({{dataValues.id}})">Cancel</button>
                    </div>

                    <button onClick={() => handleUpdateReview(review.reviewId)} id="update-review-{{dataValues.id}}" type="button"
                      className="box-border inline-block w-20 px-1 py-1 mt-2 mr-3 text-xs text-white transition-colors duration-300 ease-in-out bg-blue-600 border-2 border-black rounded hover:bg-blue-700 h-51"
                      onclick="showUpdateFields(event, {{dataValues.id}})">Update</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <button className="mt-5 text-white py-2.5 px-2.5 mr-2 rounded border-2 border-white bg-blue-600 hover:bg-blue-700" id="logout">
              <a href="/logout">Logout</a>
            </button>
          </div>
          <p className="mt-5 text-center text-white underline [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)] go-back-link hover:text-blue-700 underline-offset-1">
            <a href="/">{'<< Go back to Homepage'}</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Profile