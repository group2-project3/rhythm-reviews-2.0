import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, initialRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleMouseEnter = (star) => {
    setHoveredRating(star);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (star) => {
    onRatingChange(star);
  };

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          style={{
            fontSize: '1.8rem',
            color: star <= (hoveredRating || rating) ? 'orange' : 'gray',
          }}
        >
          {star <= (hoveredRating || rating) ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
