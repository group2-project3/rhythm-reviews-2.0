import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import GoBack from '../components/GoBack';
import './Login.css';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [loginUserMutation] = useMutation(LOGIN_USER);

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
      setShowAlert(true);
    }

    // Clear form data after login attempt
    setUserFormData({ email: '', password: '' });
  };

  return (
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
      <GoBack />
    </div>
  );
};

export default Login;
