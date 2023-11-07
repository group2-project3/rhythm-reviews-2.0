import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Homepage from './pages/Homepage';
import CreateAcct from './pages/CreateAccount';
import Login from './pages/Login';
import Profile from './pages/profile';
import Results from './pages/Results';
import Review from './pages/Review';

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
        element: <Profile />,
      },
      {
        path: '/results',
        element: <Results />,
      },
      {
        path: '/review',
        element: <Review />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);