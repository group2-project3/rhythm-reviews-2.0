import React from 'react';

const Main = ({ children }) => {
  return (
    <div className="homepage-background">
      <main>
        <div className="search-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Main;