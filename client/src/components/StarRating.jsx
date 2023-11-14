import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, initialRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(initialRating || 0); // Initialize with initialRating prop
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleMouseEnter = (star) => {
    setHoveredRating(star);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (star) => {
    onRatingChange(star);
    setSelectedRating(star); // Update the selectedRating state
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
            color: star <= (hoveredRating || selectedRating) ? 'orange' : 'gray', // Use selectedRating here
          }}
        >
          {star <= (hoveredRating || selectedRating) ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
