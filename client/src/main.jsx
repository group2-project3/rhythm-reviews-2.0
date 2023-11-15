import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Homepage from './pages/Homepage';
import CreateAcct from './pages/CreateAccount';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Results from './pages/Results';
import Album from './pages/Album';
import AuthGuard from './components/AuthGuard';
import Auth from './utils/auth';
import TopAlbums from './pages/TopAlbums';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/topalbums',
        element: <TopAlbums />,
      },
      {
        path: '/createacct',
        element: <CreateAcct />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <AuthGuard element={<Profile />} loggedIn={Auth.loggedIn()} />,
      },
      {
        path: '/results',
        element: <Results />,
      },
      {
        path: '/album/:idAlbum',
        element: <Album />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);