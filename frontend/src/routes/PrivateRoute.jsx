import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
  const {
    state: { user },
  } = useAuth();

  return user ? (
    <>
      <Header /> <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
