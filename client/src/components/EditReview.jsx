// This component is used to edit a review. It is used in the Profile component and the Album component.
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, UPDATE_REVIEW } from '../utils/mutations';
import StarRating from './StarRating';
import Helpers from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_ALBUM_BY_ID } from '../utils/queries';
import defaultPic from '../assets/DefaultPic.png';
import '../assets/css/style.css';
import Modal from 'react-modal';
import '../assets/css/modal.css';


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

  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (message) => {
    setModalIsOpen(true);
    setModalErrorMessage(message);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalErrorMessage('');
    setModalSuccessMessage('');
  };

  const openSuccessModal = (message) => {
    setModalIsOpen(true);
    setModalSuccessMessage(message);
  };

  useEffect(() => {
    if (modalErrorMessage || modalSuccessMessage) {
      openModal(modalErrorMessage || modalSuccessMessage);
    }
  }, [modalErrorMessage, modalSuccessMessage]);

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
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.error('Authentication token not available.');
      return false;
    }

    try {
      const { data } = await deleteReview({
        variables: { reviewId },
      });

      if (data && data.deleteReview) {
        console.log("Review deleted successfully");
        setModalSuccessMessage('Review deleted successfully');
        openSuccessModal();
        props.onDelete();

      } else {
        console.error('Error deleting the review. Please try again.');
        setModalErrorMessage('Error deleting the review. Please try again.');
        openModal();
      }
    } catch (e) {
      if (error.message.includes('Not authorized')) {
        console.error('You are not authorized to delete this review.');
        setModalErrorMessage('You are not authorized to delete this review.');
        openModal();
      } else {
        console.error('An error occurred while deleting the review.', error);
        setModalErrorMessage('An error occurred while deleting the review.');
        openModal();
      }
    }
  };

  const handleUpdateReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    
    if (!updatedReviewTitle || !updatedReviewContent || !updatedRating) {
      console.error('Please fill in all required fields.');
      setModalErrorMessage('Please fill in all required fields.');
      openModal();
      return;
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
      if (data) {
        console.log('Review updated successfully');
        setModalSuccessMessage('Review updated successfully');
        openSuccessModal();
      } else {
        console.error('No data returned after updating the review.');
        setModalErrorMessage('No data returned after updating the review.');
        openModal();
      }
      setEditing(false);
      props.onDelete();
    } catch (error) {
      console.error('An error occurred while updating the review.', error);
      setModalErrorMessage('An error occurred while updating the review.', error);
        openModal();
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
      <Modal
        isOpen={modalIsOpen && !!modalErrorMessage}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="modal-overlay"
      >
        <div className="modal-container">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Oops</h3>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {modalErrorMessage}
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={closeModal}
              className="close-button block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen && !!modalSuccessMessage}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        className="modal-overlay"
      >
        <div className="modal-container">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Success</h3>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {modalSuccessMessage}
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={closeModal}
              className="close-button block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditReview;