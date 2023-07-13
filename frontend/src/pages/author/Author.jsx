import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Author = () => {
  const {
    state: { user },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === 'user') {
      navigate('/courses');
    } else if (user.role === 'admin') {
      navigate('/admin');
    }
  }, [navigate, user.role]);

  return (
    <div className='container w-[95%] max-w-[1200px] mx-auto '>
      <nav className='flex gap-4 my-4 bg-gray-100 rounded-md p-4'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'bg-purple-600 p-2 px-4 rounded-md text-white'
              : 'bg-white p-2 px-4 rounded-md'
          }
          end
          to={'/author'}
        >
          Manage Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'bg-purple-600 p-2 px-4 rounded-md text-white'
              : 'bg-white p-2 px-4 rounded-md'
          }
          end
          to={'/author/courses'}
        >
          Courses
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Author;
