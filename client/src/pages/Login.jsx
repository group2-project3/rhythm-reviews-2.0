import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const loginFormHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container mt-60">
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
          <div className="mb-2 add-flex-center">
            <button
              type="button"
              onClick={loginFormHandler}
              className="create text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700 mb-7"
            >
              Login
            </button>
          </div>
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <a href="/register" className="ml-2 text-center underline hover:text-blue-700 underline-offset-1">
              Create Account
            </a>
          </p>
        </form>
      </div>
      <p className="text-center text-white underline go-back-link hover:text-blue-700 underline-offset-1 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)]">
        <a href="/">
          &lt;&lt; Go Back to Homepage
        </a>
      </p>
    </div>
  );
};

export default Login;