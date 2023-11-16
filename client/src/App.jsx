// This is the main App component that is rendered by the index.js file in the client/src directory.
import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import  Footer  from './components/Footer';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('id_token')}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;