import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, UPDATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';
import Helpers from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import defaultPic from '../assets/defaultPic.png';
import '../assets/css/style.css';

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

  useEffect(() => {
    // Update the rating when the review's rating changes
    setUpdatedRating(props.review.rating);
  }, [props.review.rating]);

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
      setUpdatedReviewTitle(updatedReviewTitle);
      setUpdatedReviewContent(updatedReviewContent);
      setUpdatedRating(updatedRating);

      const { data } = await updateReview({
        variables: {
          id: reviewId,
          title: updatedReviewTitle,
          content: updatedReviewContent,
          rating: updatedRating,
        },
      });
      setEditing(false);
      props.onDelete();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="submit-container">
        {props.review.user?.username === (Auth.loggedIn() ? Auth.getProfile()?.data.username : null) ? (
          <>
            {editing ? (
              <div className="review-form adjust-width">
                <div
                  key={props.review._id}
                  className="edit-review-text"
                  style={{ minWidth: '400px', maxWidth: '750px' }}
                >
                  <div className="edit-review-input">
                    <div className="center-container-between align-center">
                      <div className="center-container">
                        <p className="edit-review-adjust-m-left small-gray-font">{props.review.user?.username}</p>
                        <div className="edit-review-gray-bg"></div>
                        <p className="edit-review-adjust-m-right small-gray-font">{Helpers.formatDate(props.review.date)}</p>
                      </div>
                    </div>
                    <form>
                      <label htmlFor="edit-review-title" className="edit-review-input-block">
                      </label>
                      <input
                        id="edit-review-title"
                        type="text"
                        value={updatedReviewTitle}
                        onChange={(e) => setUpdatedReviewTitle(e.target.value)}
                        className="edit-review-update-style"
                        placeholder={props.review.title}
                      />
                      <textarea
                        id="edit-review-content"
                        maxLength="1000"
                        rows="4"
                        value={updatedReviewContent}
                        onChange={(e) => setUpdatedReviewContent(e.target.value)}
                        className="edit-review-update-style"
                        placeholder={props.review.content}
                      ></textarea>
                      <div>
                        <StarRating rating={updatedRating} onRatingChange={setUpdatedRating} />
                      </div>
                    </form>
                    <div className="center-container justify-end">
                      <button
                        className="delete-review edit-review-links"
                        onClick={() => handleCancelEditReview(props.review._id)}
                      >
                        Cancel
                      </button>
                      <button
                        className="delete-review edit-review-links"
                        onClick={() => handleDeleteReview(props.review._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="update-review edit-review-links"
                        onClick={() => handleUpdateReview(props.review._id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="review-form adjust-width">
                <div
                  key={props.review._id}
                  className="edit-review-text"
                  style={{ minWidth: '400px', maxWidth: '750px' }}
                >
                  <div className="edit-review-input">
                    {props.profileView && (
                      <div>
                        <a href={`/album/${album?.getAlbumById.idAlbum}`}>
                          <img
                            style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                            className="edit-review-adjust-width"
                            src={album?.getAlbumById.strAlbumThumb !== null ? album?.getAlbumById.strAlbumThumb : defaultPic}
                            alt={`${album?.getAlbumById.strArtist} - ${album?.getAlbumById.strAlbum}`}
                          />
                        </a>
                        <div className="edit-review-stretch-text">
                          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{album?.getAlbumById.strArtist}</p>
                          <p style={{ fontWeight: '1.15rem' }}>{album?.getAlbumById.strAlbum}</p>
                        </div>
                      </div>
                    )}

                    <div className="center-container-between">
                      <div className="center-container">
                        {!props.profileView && (
                          <p className="edit-review-adjust-m-left small-gray-font">{props.review.user?.username}</p>
                        )}
                        <div className="edit-review-gray-bg"></div>
                        <p className="edit-review-adjust-m-left small-gray-font">{Helpers.formatDate(props.review.date)}</p>
                      </div>
                      <div className="edit-review-adjust-ml-auto">
                        <StarRating rating={updatedRating} onRatingChange={setUpdatedRating} />
                      </div>
                    </div>
                    <div className="center-container-between">
                      <div className="center-container">
                        <p className="text-white text-md">
                          <span className="font-bold">{props.review.title}:</span> {props.review.content}
                        </p>
                      </div>
                    </div>
                    <div className="center-container justify-end">
                      <button
                        className="update-review edit-review-links"
                        onClick={() => handleEditReview(props.review._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="review-form adjust-width">
            <div
              key={props.review._id}
              className="edit-review-text"
              style={{ minWidth: '400px', maxWidth: '750px' }}
            >
              <div className="edit-review-input">
                {props.profileView && (
                  <img
                    className="edit-review-adjust-width-400"
                    src={album?.getAlbumById.strAlbumThumb !== null ? album?.getAlbumById.strAlbumThumb : defaultPic}
                    alt={`${album?.getAlbumById.strArtist} - ${album?.getAlbumById.strAlbum}`}
                  />
                )}
                <div className="center-container-between">
                  <div className="center-container">
                    <p className="edit-review-adjust-m-left small-gray-font">{props.review.user?.username}</p>
                    <div className="edit-review-gray-bg"></div>
                    <p className="ml-2 small-gray-font">{Helpers.formatDate(props.review.date)}</p>
                  </div>
                  <div className="edit-review-adjust-ml-auto">
                    <StarRating rating={props.review.rating} readOnly />
                  </div>
                </div>
                <div className="center-container-between">
                  <div className="center-container">
                    <p className="text-white text-md">
                      <span className="font-bold">{props.review.title}:</span> {props.review.content}
                    </p>
                  </div>
                </div>
                <div className="center-container-between"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditReview;