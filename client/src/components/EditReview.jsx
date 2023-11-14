import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, UPDATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';
import Helpers from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import defaultPic from '../assets/defaultPic.png';

const EditReview = (props) => {
  const { data: album } = useQuery(QUERY_ALBUM_BY_ID, {
    variables: { idAlbum: props.review.idAlbum },
  });
  const [updatedReviewTitle, setUpdatedReviewTitle] = useState('');
  const [updatedReviewContent, setUpdatedReviewContent] = useState('');
  const [updatedRating, setUpdatedRating] = useState(props.review.rating);
  const [editing, setEditing] = useState(false);

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);

  const handleEditReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setUpdatedReviewTitle(props.review.title);
      setUpdatedReviewContent(props.review.content);
      setUpdatedRating(props.review.rating);
      setEditing(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelEditReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setEditing(false);
      // Handle any logic after canceling the edit if needed
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
        variables: { id: reviewId, title: updatedReviewTitle, content: updatedReviewContent, rating: updatedRating },
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
        {props.review.user?.username === (Auth.loggedIn() ? Auth.getProfile()?.data.username : null) ? (
          <>
            {editing ? (
              <div className="review-form w-[450px]">
                <div
                  key={props.review._id}
                  className="mt-4 text-lg text-white"
                  style={{ minWidth: '400px', maxWidth: '750px' }}
                >
                  <div className="px-3 py-3 mt-1 text-black border-2 rounded-md bg-white/30">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="mr-2 text-sm text-gray-300">{props.review.user?.username}</p>
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <p className="ml-2 text-sm text-gray-300">{Helpers.formatDate(props.review.date)}</p>
                      </div>
                    </div>
                    <form>
                      <label htmlFor="edit-review-title" className="block mb-2 text-sm font-medium text-white text-gray-900">
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
                      <div>
                        {/* <p className="block mb-2 text-sm font-medium text-white text-gray-900">
                          Your Rating: {updatedRating}
                        </p> */}
                        {/* <StarRating rating={updatedRating} onRatingChange={setUpdatedRating} /> */}
                      </div>
                    </form>
                    <div className="flex items-center justify-end">
                  
                  
                
                <button
                  className="delete-review text-sm text-blue-500 hover:underline px-2.5 rounded border-2 "
                  onClick={() => handleCancelEditReview(props.review._id)}
                >
                  Cancel
                </button>
                <button
                  className="delete-review text-sm text-blue-500 hover:underline px-2.5 rounded border-2 "
                  onClick={() => handleDeleteReview(props.review._id)}
                >
                  Delete
                </button>
                <button
                  className="update-review text-sm text-blue-500 hover:underline px-2.5 rounded border-2"
                  onClick={() => handleUpdateReview(props.review._id)}
                >
                  Update
                </button>
              </div>
              </div>
              </div>
              </div>
            ) : (
              <div className="review-form w-[450px]">
                <div
                  key={props.review._id}
                  className="mt-4 text-lg text-white"
                  style={{ minWidth: '400px', maxWidth: '750px' }}
                >
                  <div className="px-3 py-3 mt-1 text-black border-2 rounded-md bg-white/30">
                    {props.profileView && (
                      <div>
                      <a href={`/album/${album?.getAlbumById.idAlbum}`}>

                        <img
                          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                          className="w-[125px]"
                          src={album?.getAlbumById.strAlbumThumb !== null ? album?.getAlbumById.strAlbumThumb : defaultPic}
                          alt={`${album?.getAlbumById.strArtist} - ${album?.getAlbumById.strAlbum}`}
                        />
                      </a>
                      <div className="grow justify-self-stretch text-white">
                        <p style={{fontSize: '1.3rem' , fontWeight: 'bold'}}>{album?.getAlbumById.strArtist}</p>
                        <p style={{fontWeight: '1.15rem'}}>{album?.getAlbumById.strAlbum}</p>
                      </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                      {!props.profileView && (
                        <p className="mr-2 text-sm text-gray-300">{props.review.user?.username}</p>
                        )}
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <p className="ml-2 text-sm text-gray-300">{Helpers.formatDate(props.review.date)}</p>
                      </div>
                      <div className="ml-auto">
                        {/* <p className="mb-2 ml-5">Rating: {props.review.rating}</p> */}
                        <StarRating rating={updatedRating} onRatingChange={setUpdatedRating} />
                      </div>

                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-white  text-md"><span className="font-bold">{props.review.title}:</span> {props.review.content}</p>
                        </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <button
                            className="text-sm text-blue-500 update-review hover:underline"
                            onClick={() => handleEditReview(props.review._id)}
                          >   Edit
                          </button>
                        
                      </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="review-form w-[450px]">

            <div
              key={props.review._id}
              className="mt-4 text-lg text-white"
              style={{ minWidth: '400px', maxWidth: '750px' }}
            >
              <div className="px-3 py-3 mt-1 text-white border-2 rounded-md bg-white/30">
                {props.profileView && (

                  <img
                    className="w-[400px]"
                    src={album?.getAlbumById.strAlbumThumb !== null ? album?.getAlbumById.strAlbumThumb : defaultPic}
                    alt={`${album?.getAlbumById.strArtist} - ${album?.getAlbumById.strAlbum}`}
                  />
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="mr-2 text-sm text-gray-300">{props.review.user?.username}</p>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <p className="ml-2 text-sm text-gray-300">{Helpers.formatDate(props.review.date)}</p>
                  </div>
                  <div className="ml-auto">
                    {/* <p className="mb-2 ml-5">Rating: {props.review.rating}</p> */}
                    <StarRating rating={props.review.rating} readOnly />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  <p className="text-white  text-md"><span className="font-bold">{props.review.title}:</span> {props.review.content}</p>
                    <div className="flex items-center justify-end">
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditReview;
