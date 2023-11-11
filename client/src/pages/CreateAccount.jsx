import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import GoBack from '../components/GoBack';

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
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md"> 
        <h1 className="mt-20 mb-8 ml-6 text-2xl text-white">Create Account</h1>
        <form className="signup-form">
          <div className="mb-2">
            <label htmlFor="username" className="text-white">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 border-solid border-stone-300 border rounded mb-3"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border-solid border-stone-300 border rounded mb-3"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border-solid border-stone-300 border rounded mb-3"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={signupFormHandler}
              className="px-4 py-2 mt-3 text-white bg-blue-600 border-2 border-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          <GoBack />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
