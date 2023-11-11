import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Homepage from './pages/Homepage';
import CreateAcct from './pages/CreateAccount';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Review from './pages/Review';
import Album from './pages/Album';
import AuthGuard from './components/Authguard';
import Auth from './utils/auth';

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
        path: '/album/:idAlbum',
        element: <Album />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);