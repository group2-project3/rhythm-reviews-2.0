import React from 'react';

const CreateAccount = () => {
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
                            className="text-left w-full p-2.5 border-solid border-stone-300 border rounded mb-5"
                            required
                        />
                    </div>
                    <div className="add-flex-center">
                        <button
                            type="submit"
                            className="text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700 mt-5"
                        >
                            Submit
                        </button>
                    </div>
                    <p className="mt-5 text-center text-white underline go-back-link hover:text-blue-700 underline-offset-1 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)]">
                        <a href="/">
                            &lt;&lt; Go Back to Homepage
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default CreateAccount;