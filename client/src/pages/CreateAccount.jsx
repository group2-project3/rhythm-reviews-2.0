//Create Account page
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../assets/css/modal.css';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import GoBack from '../components/GoBack';
import './CreateAccount.css';


Modal.setAppElement('#root');

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  // Check if the user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);

  const openModal = (message) => {
    setModalIsOpen(true);
    setErrorMessage(message);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage('');
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();

    if (username && email && password) {
      try {
        const { data } = await registerUser({
          variables: { username, email, password },
        });

        if (data.registerUser) {
          Auth.login(data.registerUser.token);
          document.location.replace('/');
        } else {
          openModal('Failed to signup');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        openModal('Failed to signup. Please try again.');
      }
    } else {
      openModal('Please fill in all fields');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className="adjust-height center-container">
      <div className="adjust-width">
        <h1 className="create-account-title">Create Account</h1>
        <form>
          <div className="adjust-bottom-margin">
            <label htmlFor="username" className="white-font-color">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input-box"
              required
            />
          </div>
          <div className="adjust-bottom-margin">
            <label htmlFor="email" className="white-font-color">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input-box"
              required
            />
          </div>
          <div className="adjust-bottom-margin">
            <label htmlFor="password" className="white-font-color">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input-box"
              required
            />
          </div>
          <div className="submit-container">
            <button
              type="submit"
              onClick={signupFormHandler}
              className="submit-button"
            >
              Submit
            </button>
          </div>
          <div className="submit-container">
            <GoBack />
          </div>
        </form>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Error Modal"
          className="modal-overlay"
        >
          <div className="modal-container">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Oops
            </h3>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {errorMessage}
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={closeModal}
                className="close-button block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default CreateAccount;
