// This page is the user profile page. It displays the user's username, email, and reviews. 
//It also allows the user to change their password and delete their account.
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import '../assets/css/modal.css';
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { UPDATE_PASSWORD, DELETE_ACCOUNT } from "../utils/mutations";
import { userProfileQuery } from "../utils/queries";
import EditReview from "../components/EditReview";
import SearchBar from '../components/SearchBar';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteAccountConfirmation, setDeleteAccountConfirmation] = useState("");
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');

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

  const [isPasswordUpdatedModalOpen, setPasswordUpdatedModalOpen] = useState(false);

  const openPasswordUpdatedModal = () => {
    setPasswordUpdatedModalOpen(true);
  };

  const closePasswordUpdatedModal = () => {
    setPasswordUpdatedModalOpen(false);
  };

  const openModal = (message) => {
    console.log('Message in openModal:', message);
    setModalIsOpen(true);
    setErrorMessage(message);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage('');
  };

  useEffect(() => {
    if (modalSuccessMessage) {
      openSuccessModal(modalSuccessMessage);
    }
  }, [modalSuccessMessage]);


  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, [data]);

  useEffect(() => {
    if (errorMessage) {
      setModalErrorMessage(errorMessage);
      openModal(errorMessage);
    }
  }, [errorMessage]);


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
      openPasswordUpdatedModal("Password updated successfully!");
      //closes the change password form after change
      setChangePasswordOpen(!isChangePasswordOpen);
    } catch (err) {
      console.error(err);
      setModalErrorMessage("Something went wrong. Confirm you are entering your current password and the updated passwords match.");
      openModal(errorMessage);
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
      setModalErrorMessage('Please type "DELETE" to confirm account deletion.');
      openModal(errorMessage);
      return;
    }

    if (!password) {
      setModalErrorMessage('Password is required to delete your account.');
      openModal(errorMessage);
      return;
    }

    try {
      const { data } = await deleteAccount({
        variables: {
          password,
        },
      });

      if (data.deleteAccount.success) {
        setModalSuccessMessage(data.deleteAccount.message);
        Auth.removeToken();
        navigate("/login");
      } else {
        setModalErrorMessage('Account deletion failed. ' + data.deleteAccount.message);
        openModal(errorMessage);
      }
    } catch (err) {
      console.error(err);
      setModalErrorMessage("Something went wrong. Did you type in the correct password? Please try again!");
      openModal(errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="results-container">
        <SearchBar />
      </div>

      <div className="content-div">
        <div className="change-account">
          <h1 className="user-info-div">Welcome, {user?.username}!</h1>
          <div className="email-div">
            <p className="email-p-tag">{user?.email}</p>
          </div>

          <div className="button-div m">
            <button
              onClick={toggleChangePasswordForm}
              className="delete-button"
            >
              {isChangePasswordOpen ? 'Close Password Editor' : 'Change Password'}
            </button>
            {isChangePasswordOpen && (
              <form onSubmit={handlePasswordChange}>
                <h2 className="form-text"></h2>
                <div className="form-div form-group">
                  <label htmlFor="currentPassword" className="form-div-text">
                    Current Password:
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="form-input form-control"
                    required
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="newPassword" className="form-div-text">
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input form-control"
                    required
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="confirmPassword" className="form-div-text">
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input form-control"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="save-button"
                >
                  Save New Password
                </button>
              </form>
            )}

            <button
              onClick={() => setDeleteAccountVisible(!isDeleteAccountVisible)}
              className="delete-button mb-2 mt-3 ml-1"
            >
              {isDeleteAccountVisible ? 'Close Delete Account Editor' : 'Delete Account'}
            </button>
            {isDeleteAccountVisible && (
              <form onSubmit={handleDeleteAccount}>
                <h2 className="form-text"></h2>
                <div className="form-div form-group">
                  <label htmlFor="deleteConfirmation" className="form-div-text">
                    Type "DELETE" to confirm deletion:
                  </label>
                  <input
                    type="text"
                    id="deleteConfirmation"
                    name="deleteConfirmation"
                    value={deleteAccountConfirmation}
                    onChange={(e) => setDeleteAccountConfirmation(e.target.value)}
                    className="form-input form-control"
                    required
                  />
                </div>
                <div className="form-div form-group mt-0">
                  <label htmlFor="password" className="form-div-text">
                    Enter password to confirm deletion:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input form-control mb-2 mt-0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="delete-account-button"
                >
                  Delete Account
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="album-div">
          <div className="album-box">
            <div>
              <h2 className="album-head">Your Reviews</h2>
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
        <div className="album-right-div">
        </div>
      </div>
      <Modal
        isOpen={isPasswordUpdatedModalOpen}
        onRequestClose={closePasswordUpdatedModal}
        contentLabel="Password Updated Modal"
        className="modal-overlay"
      >
        <div className="modal-container">
          <h3 className="model-h-tag">Success</h3>
          <div className="model-div">
            <p className="model-text">
              Password updated successfully!
            </p>
          </div>
          <div className="model-update-div">
            <button
              onClick={closePasswordUpdatedModal}
              className="close-button model-button"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
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

    </>
  );
};

export default Profile;