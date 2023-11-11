import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import GoBack from '../components/GoBack';

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
    <div className="login-container mt-60 flex flex-col items-center">
      <h1 className="mb-8 text-2xl text-center text-white">Login</h1>
      <h4 id="api-message" className="hidden text-red-600"></h4>

      <div className="flex-row-reverse">
        <form className="text-left max-w-lg p-6 mb-2.5 block font-bold">
          <div className="mb-2">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-3"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userFormData.password}
              onChange={handleInputChange}
              className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-3"
              required
            />
          </div>
          <div className="mb-2 add-flex-center">
            <button
              type="button"
              onClick={loginFormHandler}
              className="create text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700 mb-7"
            >
              Login
            </button>
          </div>
          <p className="text-sm text-white text-center">
            Don't have an account?{" "}
            <a href="/createacct" className="ml-2 text-center underline hover:text-blue-700 underline-offset-1">
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
