import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AllBooks from '../pages/AllBooks';
import AddBook from '../pages/AddBook';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import BookDetails from '../pages/BookDetails';
import Wishlist from '../pages/Wishlist';
import ReadingList from '../pages/ReadingList';
import EditBook from '../pages/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/books',
        element: <AllBooks />
      },
      {
        path:'/add-new-book',
        element: <PrivateRoute><AddBook /></PrivateRoute>
      },
      {
        path:'/edit-book/:bookId',
        element: <PrivateRoute> <EditBook /></PrivateRoute>
      },
      {
        path: '/books/:bookId',
        element: <BookDetails />
      },
      {
        path: '/my-wishlist',
        element: <PrivateRoute><Wishlist /></PrivateRoute>
      },
      {
        path: '/my-readlist',
        element: <PrivateRoute><ReadingList /></PrivateRoute>
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  }, 
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
