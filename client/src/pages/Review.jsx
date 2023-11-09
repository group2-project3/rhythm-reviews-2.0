import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';
import { DELETE_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';

const Review = () => {
    const { loading, data } = useQuery(QUERY_REVIEWS);
    const reviews = data?.reviews || [];
    const [addReview] = useMutation(ADD_REVIEW);
    const logged_in = Auth.loggedIn();
    const [reviewAlbum, setReviewAlbum] = useState('');

    const handleAddReview = async (event) => {
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addReview({
                variables: { reviewAlbum }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await deleteReview({
                variables: { reviewId }
            });
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-60">
            {/* this line may not be React compatible */}
            <form id="search-form" className="text-center" action="/api/reviews/artist-search" method="GET">
                {/* input closing tag missing from original code */}
                <input id="search-input" className="p-2.5 w-[300px]" type="text" name="artistName" placeholder="Search..."></input>
                {/* will need to add onClick to button but need function to pass in, maybe line 3? */}
                <button className="text-white py-2.5 px-2.5 rounded border-2 border-white hover:bg-blue-700">Search</button>
            </form>
            <div className="login-create-account-link add-flex-center"></div>

            {/* React alternative to {{#if logged_in}} */}
            {/* Changed a tag to button */}
            {logged_in &&
                <p
                    className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 ml-14">
                    <a href="/profile">Profile</a>
                </p>
            }
            {logged_in &&
                <p className="float-left inline break-words mr-1.5 text-white text-center">or</p>
            }
            {logged_in &&
                <p
                    className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 mr-40">
                    <button href="/api/users/logout">Logout</button>
                </p>
            }

            {/* React alternative to {{#unless logged_in}} unsure about { unless_block = "" } not sure what to put in ""*/}
            {/* Changed both a tags to buttons */}
            let unless_block = "";
            if (!props.logged_in) {unless_block = ""}
            return (
            <p
                className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 ml-14">
                <button href="/login">Login</button>
            </p>
            <p className="float-left inline break-words mr-1.5 text-white text-center">or</p>
            <p
                className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 mr-40">
                <button href="/createacct">Create Account</button>
            </p>
            );

            {/* React alternative to {{#each albums}} */}
            {/* converted the a tag to button */}
            {/* may need to wrap this bottom portion into a div */}
            {reviews.map((album) => (
                <div className="add-flex-center">
                    <div className="inline-block w-full h-auto max-w-xs p-4 m-10 text-white rounded bg-white/30 selected-album">
                        <h5>{{ strAlbum }}</h5>
                        <p>{{ intYearReleased }}</p>
                        <img className="w-[400px]" src="{{strAlbumThumb}}" alt="{{strAlbum}}"></img>
                    </div>
                </div>
            ))}

            {/* React alternative to {{#if logged_in}} */}
            <div class="review-form">
                {logged_in &&
                    <label for="review-title" className="block mb-2 text-sm font-medium text-white text-gray-900">Add Your Review Here</label>
                }
                {logged_in &&
                    <input id="review-title" type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title your review"></input>
                }
                {logged_in &&
                    <textarea id="review-content" maxLength="1000" rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                        placeholder="Your thoughts on the album..."></textarea>
                }
                {logged_in &&
                    <div className="add-flex-center">
                        <button id="submit-review"
                            className="add-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-blue-600 hover:bg-blue-700 mt-5"
                            type="submit">Add Review</button>
                    </div>
                }
            </div>
            {/* React alternative to {{#unless logged_in}} unsure about { unless_block = "" } not sure what to put in ""*/}
            {/* Changed a tag to button */}
            let unless_block = "";
            if (!props.logged_in) {unless_block = ""}
            return (
            <p className="text-center text-white underline break-words mr-14 hover:text-blue-700 underline-offset-1 ml-14">
                <button href="/login">Login to leave a review</button>
            </p>
            );

            {/* React alternative to {{#each albums}} */}
            {/* ERROR with dataValues */}
            <p className="mb-2 ml-5">Username: {dataValues.user.dataValues.username}</p>
            <p className="mb-2 ml-5">Date: {dataValues.user.dataValues.date}</p>
            <p className="mb-2 ml-5">Title: {dataValues.album.dataValues.title}</p>
            <p className="mb-2 ml-5">Review: {dataValues.review.dataValues.review}</p>
            <div class="pb-40"></div>

        </div>
    );
};

export default Review;