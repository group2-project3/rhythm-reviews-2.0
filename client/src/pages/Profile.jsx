import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { UPDATE_PASSWORD, DELETE_ACCOUNT } from "../utils/mutations";
import { userProfileQuery } from "../utils/queries";
import Logout from "../components/Logout";
import GoBack from "../components/GoBack";
import EditReview from "../components/EditReview";
import SearchBar from '../components/SearchBar';

const Profile = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteAccountConfirmation, setDeleteAccountConfirmation] = useState("");
  const [password, setPassword] = useState(""); // New state for password

  const { loading, error, data, refetch } = useQuery(userProfileQuery);
  const user = data?.getUserProfile;
  const reviews = user?.reviews || [];
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT);

  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isDeleteAccountVisible, setDeleteAccountVisible] = useState(false);

  const toggleChangePasswordForm = () => {
    setChangePasswordOpen(!isChangePasswordOpen);
  };

  const toggleDeleteAccountVisibleForm = () => {
    setDeleteAccountVisible(!isDeleteAccountVisible);
  };

  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
    console.log('data', data);
  }, [data]);

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updatePassword({
        variables: {
          currentPassword,
          newPassword,
          confirmPassword,
        },
      });
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again!");
    }
  };

  const handleUpdateReview = async () => {
    refetch();
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    if (deleteAccountConfirmation !== "DELETE") {
      alert('Please type "DELETE" to confirm account deletion.');
      return;
    }

    if (!password) {
      alert('Password is required to delete your account.');
      return;
    }

    try {
      const { data } = await deleteAccount({
        variables: {
          password,
        },
      });

      if (data.deleteAccount.success) {
        alert(data.deleteAccount.message);
        navigate("/login");
      } else {
        alert('Account deletion failed. ' + data.deleteAccount.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
     <GoBack />
      <SearchBar />

      <div className="flex flex-col items-center lg:flex-row">
        <div className="grid mb-auto md:w-1/3 md:justify-end lg:w/13 lg:justify-end">
          <h1 className="text-2xl text-white mb-1 text-center">Welcome, {user?.username}!</h1>
          <div className="text-white d-none d-lg-block">
            <p className="pt-2 text-center">{user?.email}</p>
          </div>

          <div className="inline-block w-5/5 ml-4 mr-4 max-w-lg p-5 text-center rounded bg-white/30 shadow-white-30 mt-2">
            <button
              onClick={toggleChangePasswordForm}
              className=" text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700"
            >
              {isChangePasswordOpen ? 'Close Password Editor' : 'Change Password'}
            </button>
            {isChangePasswordOpen && (
              <form onSubmit={handlePasswordChange}>
                <h2 className="mb-3 text-white"></h2>
                <div className="mb-3 text-left form-group">
                  <label htmlFor="currentPassword" className="mb-1 text-white">
                    Current Password:
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                    required
                  />
                </div>
                <div className="mb-3 text-left">
                  <label htmlFor="newPassword" className="mb-1 text-white">
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                    required
                  />
                </div>
                <div className="mb-3 text-left">
                  <label htmlFor="confirmPassword" className="mb-1 text-white">
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mb-5 text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700"
                >
                  Save New Password
                </button>
              </form>
            )}
          </div>

          <div className="inline-block w-5/5 ml-4 mr-4 max-w-lg p-5 text-center rounded bg-white/30 shadow-white-30 mt-2">
            <button
              onClick={() => setDeleteAccountVisible(!isDeleteAccountVisible)}
              className="text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700"
            >
              {isDeleteAccountVisible ? 'Close Delete Account' : 'Delete Account'}
            </button>
            {isDeleteAccountVisible && (
              <form onSubmit={handleDeleteAccount}>
                <h2 className="mb-3 text-white"></h2>
                <div className="mb-3 text-left form-group">
                  <label htmlFor="deleteConfirmation" className="mb-1 text-white">
                    Type "DELETE" to confirm deletion:
                  </label>
                  <input
                    type="text"
                    id="deleteConfirmation"
                    name="deleteConfirmation"
                    value={deleteAccountConfirmation}
                    onChange={(e) => setDeleteAccountConfirmation(e.target.value)}
                    className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                    required
                  />
                </div>
                <div className="mb-3 text-left form-group">
                  <label htmlFor="password" className="mb-1 text-white">
                    Enter your password to confirm account deletion:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5 form-control"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mb-5 text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700"
                >
                  Delete Account
                </button>
              </form>
            )}
          </div>

        </div>
        <div className="grid justify-center mt-2" style={{ width: '67%', flex: '1' }}>
          <div className="inline-block w-full h-auto max-w-md p-4 m-1 text-white rounded bg-white/30">
            <div>
              <h2 className="mb-2 text-2xl text-center text-white">Your Reviews</h2>
              <ul>
                {data?.getUserProfile.savedReviews.map((review) => (
                  <EditReview
                    key={review._id}
                    review={review}
                    onDelete={handleUpdateReview}
                    profileView={true}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="grid justify-center mt-2 ml-2 mb-auto" style={{ width: '380px', flex: '1' }}>
        </div>
      </div>
    </>
  );
};

export default Profile;