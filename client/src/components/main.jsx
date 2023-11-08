import React from 'react';

const Main = ({ stylesPath, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rhythm Reviews</title>
        <link rel="stylesheet" type="text/css" href={stylesPath} />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="homepage-background">
        <main>
          <div className="search-container">
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default Main;