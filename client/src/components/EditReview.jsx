import React, { useState } from "react";
import {  useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Helpers from '../utils/helpers';
import { UPDATE_REVIEW, DELETE_REVIEW } from '../utils/mutations';
import { QUERY_ALBUM_BY_ID } from "../utils/queries";

const EditReview = (props) => {

    const {data: album} = useQuery(QUERY_ALBUM_BY_ID, {
      variables: { idAlbum: props.review.idAlbum },
    });
    const [updateReview] = useMutation(UPDATE_REVIEW);
    const [deleteReview] = useMutation(DELETE_REVIEW);
    const [editing, setEditing] = useState(false);
    const [updatedReviewTitle, setUpdatedReviewTitle] = useState('');
    const [updatedReviewContent, setUpdatedReviewContent] = useState('');
    
    const handleEditReview = async (reviewId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          setUpdatedReviewTitle(props.review.title);
          setUpdatedReviewContent(props.review.content);
          setEditing(true);
          // Handle any logic after updating the review if needed
        } catch (e) {
          console.error(e);
        }
      }
    
      const handleCancelEditReview = async (reviewId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          setEditing(false);
          // Handle any logic after updating the review if needed
        } catch (e) {
          console.error(e);
        }
      }
    
    
      const handleDeleteReview = async (reviewId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          const { data } = await deleteReview({
            variables: { reviewId },
          });
          props.onDelete();
        } catch (e) {
          console.error(e);
        }
      };
    
      const handleUpdateReview = async (reviewId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          const { data } = await updateReview({
            variables: { id: reviewId, title: updatedReviewTitle, content: updatedReviewContent },
          });
          setEditing(false);
          // Handle any logic after updating the review if needed
        } catch (e) {
          console.error(e);
        }
      };
    return (
        <>
            <div className="flex justify-center">
                {(props.review.user?.username === Auth.getProfile().data.username) ?
                    <>
                        {editing ?
                            <>

                                <div className="review-form w-[450px]">
                                    <div key={props.review._id} className="mt-4 text-white text-lg">
                                        <div className="px-5 py-5 mt-1 bg-white border-2 border-blue-600 rounded-md text-black">
                                            <p className="mb-2 ml-5">Username: {props.review.user?.username}</p>
                                            <p className="mb-2 ml-5">Date: {Helpers.formatDate(props.review.date)}</p>
                                            <form>
                                                <label htmlFor="edit-review-title" className="block mb-2 text-sm font-medium text-white text-gray-900">
                                                    Review Title
                                                </label>
                                                <input
                                                    id="edit-review-title"
                                                    type="text"
                                                    value={updatedReviewTitle}
                                                    onChange={(e) => setUpdatedReviewTitle(e.target.value)}
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder={props.review.title}
                                                />
                                                <textarea
                                                    id="edit-review-content"
                                                    maxLength="1000"
                                                    rows="4"
                                                    value={updatedReviewContent}
                                                    onChange={(e) => setUpdatedReviewContent(e.target.value)}
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                                                    placeholder={props.review.content}
                                                ></textarea>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="delete-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700 mt-3"
                                    onClick={() => handleCancelEditReview(props.review._id)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="delete-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-red-600 hover:bg-red-700 mt-3"
                                    onClick={() => handleDeleteReview(props.review._id)}
                                >
                                    Delete Review
                                </button>
                                <button
                                    className="update-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-green-600 hover:bg-green-700 mt-3"
                                    onClick={() => handleUpdateReview(props.review._id)}
                                >
                                    Update Review
                                </button>
                            </> : <>
                                <div className="review-form w-[450px]">
                                    <div key={props.review._id} className="mt-4 text-white text-lg">
                                        <div className="px-5 py-5 mt-1 bg-white border-2 border-blue-600 rounded-md text-black">
                                            {props.displayThumbnail ? <>
                                              <img className="w-[400px]" src={album?.getAlbumById.strAlbumThumb} alt={`${album?.getAlbumById.strArtist} - ${album?.getAlbumById.strAlbum}`} />
                                            </> : null}
                                            <p className="mb-2 ml-5">Username: {props.review.user?.username}</p>
                                            <p className="mb-2 ml-5">Date: {Helpers.formatDate(props.review.date)}</p>
                                            <p className="mb-2 ml-5">Title: {props.review.title}</p>
                                            <p className="mb-2 ml-5">Review: {props.review.content}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="update-review text-white py-2.5 px-2.5 rounded border-2 border-white bg-green-600 hover:bg-green-700 mt-3"
                                    onClick={() => handleEditReview(props.review._id)}
                                >
                                    Edit Review
                                </button>
                            </>
                        }
                    </> : <>

                        <div className="review-form w-[450px]">
                            <div key={props.review._id} className="mt-4 text-white text-lg">
                                <div className="px-5 py-5 mt-1 bg-white border-2 border-blue-600 rounded-md text-black">
                                {props.displayThumbnail ? <>
                                              <img className="w-[400px]" src={album?.getAlbumById.strAlbumThumb} alt={`${album?.getAlbumById.strArtist} - ${album?.getAlbumById.strAlbum}`} />
                                            </> : null}
                                            <p className="mb-2 ml-5">Username: {props.review.user?.username}</p>
                                    <p className="mb-2 ml-5">Date: {Helpers.formatDate(props.review.date)}</p>
                                    <p className="mb-2 ml-5">Title: {props.review.title}</p>
                                    <p className="mb-2 ml-5">Review: {props.review.content}</p>
                                </div>
                            </div>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default EditReview;