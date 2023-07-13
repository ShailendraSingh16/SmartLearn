import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const {
    state: { user },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'user') {
      navigate('/courses');
    } else if (user && user.role === 'author') {
      navigate('/author');
    }
  }, [navigate, user]);

  return (
    <div className='container w-[95%] max-w-[1200px] mx-auto '>
      <h1 className='text-2xl my-4'>Admin Dashboard</h1>

      <nav className='flex gap-4 my-4 bg-gray-100 rounded-md p-4'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'bg-purple-600 p-2 px-4 rounded-md text-white'
              : 'bg-white p-2 px-4 rounded-md'
          }
          end
          to={'/admin/users'}
        >
          Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'bg-purple-600 p-2 px-4 rounded-md text-white'
              : 'bg-white p-2 px-4 rounded-md'
          }
          end
          to={'/admin/authors'}
        >
          Authors
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'bg-purple-600 p-2 px-4 rounded-md text-white'
              : 'bg-white p-2 px-4 rounded-md'
          }
          end
          to={'/admin/courses'}
        >
          Courses
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
