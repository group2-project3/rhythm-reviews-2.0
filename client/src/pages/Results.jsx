import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';


const Results = () => {
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
            <div className="login-create-account-link add-flex-center">
                {/* React alternative to {{#if logged_in}} */}
                {logged_in && <p
                    className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 ml-14">
                    <a href="/profile">Profile</a></p>}
                {logged_in && <p className="float-left inline break-words mr-1.5 text-white text-center">or</p>}
                {logged_in && <p
                    className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 mr-40">
                    <a href="/api/users/logout">Logout</a></p>}
                {/* React alternative to {{#unless logged_in}} unsure about { unless_block = "" } not sure what to put in ""*/}
                let unless_block = "";
                if (!props.logged_in) {unless_block = ""}
                return (
                <p
                    className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 ml-14">
                    <a href="/login">Login</a></p>
                <p className="float-left inline break-words mr-1.5 text-white text-center">or</p>
                <p
                    className="float-left inline break-words mr-1.5 text-white hover:text-blue-700 text-center underline underline-offset-1 mr-40">
                    <a href="/createacct">Create Account</a></p>
                );
            </div>
            <h1 className="mb-5 ml-12 text-2xl text-white">Albums</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"></div>
            {/* React alternative to {{#each albums}} */}
            {/* converted the a tag to button */}
            {/* may need to wrap this bottom portion into a div */}
            {results.map((album) => (
                <div className="ml-4 mr-4 p-4 mb-4 text-white bg-white bg-opacity-30 rounded-xl hover:scale-110 hover:bg-blue-600 hover:bg-opacity-80 album-search-result">
                    <h5>{{ strAlbum }}</h5>
                    <p>{{ intYearReleased }}</p>
                    <button href="/api/reviews/album/{{idAlbum}}"><img src="{{strAlbumThumb}}" alt="{{strAlbum}}"></img></button>
                </div>
            ))}
        </div >
    );
};

export default Results;