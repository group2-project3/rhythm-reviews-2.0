// Star rating component
import React, { useState } from 'react';
import '../assets/css/style.css';

const StarRating = ({ rating, onRatingChange, onHoverRatingChange, readOnly }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleMouseEnter = (star) => {
    setHoveredRating(star);
    if (onHoverRatingChange) {
      onHoverRatingChange(star);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
    if (onHoverRatingChange) {
      onHoverRatingChange(null);
    }
  };

  const handleStarClick = (star) => {
    // Update the database with the selected star count
    onRatingChange(star);
  };

  return (
    <div className="submit-container">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          style={{
            fontSize: '1.8rem',
            color: (readOnly ? star <= rating : star <= (hoveredRating || rating)) ? 'orange' : 'gray',
          }}
        >
          {star <= (hoveredRating || rating) ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
