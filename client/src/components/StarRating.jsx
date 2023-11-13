import React, { useState } from 'react';

const StarRating = ({ readOnly, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    if (!readOnly) {
      setRating(index);
      onRatingChange(index);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            disabled={readOnly} 
          >
            <span className="star" style={{ fontSize: '1.5rem' }}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

