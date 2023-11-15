import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import GoBack from '../components/GoBack';
import './Login.css';
import Modal from 'react-modal';
import '../assets/css/modal.css';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [loginUserMutation] = useMutation(LOGIN_USER);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  const openModal = (message) => {
    console.log('Message in openModal:', message);
    setModalIsOpen(true);
    setModalErrorMessage(message); 
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage('');
  };

  useEffect(() => {
    if (modalErrorMessage) {
      openModal(modalErrorMessage);
    }
  }, [modalErrorMessage]);

  // Check if user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const loginFormHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      // Execute the LOGIN_USER mutation
      const { data } = await loginUserMutation({
        variables: { ...userFormData }
      });

      // Check if the mutation was successful
      if (data && data.loginUser) {
        const { token, user } = data.loginUser;
        Auth.login(token);
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      setModalErrorMessage('Invalid credentials. Please try again.');
      openModal(errorMessage);
      setShowAlert(true);
    }

    // Clear form data after login attempt
    setUserFormData({ email: '', password: '' });
  };

  return (
    <>
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <h4 id="api-message" className="hidden red-warning-text"></h4>

      <div className="center-container">
        <form className="align-font">
          <div className="adjust-bottom-margin">
            <label htmlFor="email" className="white-font-color">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
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
              value={userFormData.password}
              onChange={handleInputChange}
              className="form-input-box"
              required
            />
          </div>
          <div className="larger-margin-bottom add-flex-center">
            <button
              type="button"
              onClick={loginFormHandler}
              className="login-button"
            >
              Login
            </button>
          </div>
          <p className="small-white-text">
            Don't have an account?{" "}
            <a href="/createacct" className="create-account-link">
              Create Account
            </a>
          </p>
        </form>
      </div>
      <GoBack/>
    </div>
    <Modal
        isOpen={modalIsOpen && !!modalErrorMessage}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="modal-overlay"
      >
        <div className="modal-container">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Oops</h3>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {modalErrorMessage}
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
    </>
  );

};

export default Login;
