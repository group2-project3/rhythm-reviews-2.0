import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useEffect } from 'react';
import GoBack from '../components/GoBack';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  

  // Check if user is logged in
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
            auth.login(data.registerUser.token);
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

  return (
    <>
      <h1 className="mb-10 ml-12 text-2xl text-white mt-60">Create Account</h1>
      <div className="flex-row-reverse">
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
              className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5"
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
              className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5"
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
              className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5"
              required
            />
          </div>
          <div className="add-flex-center">
            <button
              type="submit"
              onClick={signupFormHandler}
              className="text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700 mt-5"
            >
              Submit
            </button>
          </div>
          <GoBack />
        </form>
      </div>
    </>
  );
};

export default CreateAccount;