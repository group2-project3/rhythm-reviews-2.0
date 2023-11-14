import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import GoBack from '../components/GoBack';
import './CreateAccount.css';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  // Check if the user is logged in
  useEffect(() => {
    Auth.loggedIn();
  }, []);

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
          alert('Failed to signup');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Failed to signup. Please try again.');
      }
    } else {
      alert('Please fill in all fields');
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
      </div>
    </div>
  );
};

export default CreateAccount;
