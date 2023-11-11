import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { UPDATE_PASSWORD, DELETE_REVIEW, UPDATE_REVIEW } from '../utils/mutations';
import { userProfileQuery } from '../utils/queries';
import Logout from "../components/Logout";
import { useEffect } from "react";
import GoBack from "../components/GoBack";
import EditReview from "../components/EditReview";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, error, data, refetch } = useQuery(userProfileQuery);
  const user = data?.getUserProfile;
  const reviews = user?.reviews || [];
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  


  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();

    console.log('data',data);
  }, [data]);



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

  const handleUpdateReview = async () => {
    refetch();
  }

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
              {data?.getUserProfile.savedReviews.map((review) => (
                    <EditReview key={review._id} review={review} 
                    onDelete={handleUpdateReview}
                     />
                ))}
            </ul>
          </div>

          <div className="mt-5">
            <button className="mt-5 text-white py-2.5 px-2.5 mr-2 rounded border-2 border-white bg-blue-600 hover:bg-blue-700" id="logout">
            <Logout />
            </button>
          </div>
          <GoBack />

        </div>
      </div>
    </div>
  );
};

export default Profile