import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Courses from '../pages/Courses';
import Course from '../pages/Course';
import Wishlist from '../pages/Wishlist';
import PrivateRoute from './PrivateRoute';
import Author from '../pages/author/Author';
import Dashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageAuthors from '../pages/admin/ManageAuthors';
import ManageCourses from '../pages/admin/ManageCourses';
import AuthorCourses from '../pages/author/AuthorCourses';
import AuthorProfile from '../pages/author/AuthorProfile';
import AuthorAddCourse from '../pages/author/AuthorAddCourse';
import AuthorEditCourse from '../pages/author/AuthorEditCourse';
import MyCourses from '../pages/MyCourses';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:courseId',
        element: <Course />,
      },
      {
        path: 'courses/mycourses',
        element: <MyCourses />,
      },
      {
        path: 'author',
        element: <Author />,
        children: [
          {
            index: true,
            element: <AuthorProfile />,
          },
          {
            path: 'courses',
            element: <AuthorCourses />,
          },
          {
            path: 'add-course',
            element: <AuthorAddCourse />,
          },
          {
            path: 'edit-course/:courseId',
            element: <AuthorEditCourse />,
          },
        ],
      },
      {
        path: 'admin',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <ManageUsers />,
          },
          {
            path: 'users',
            element: <ManageUsers />,
          },
          {
            path: 'authors',
            element: <ManageAuthors />,
          },
          {
            path: 'courses',
            element: <ManageCourses />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'wishlist',
        element: <Wishlist />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
