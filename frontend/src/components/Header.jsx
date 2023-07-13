import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../reducres/authReducers';
import Logo from './Logo';

const Header = () => {
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='shadow sticky top-0 bg-white/75 z-50 backdrop-blur-sm'>
      <div className='container w-[95%] max-w-[1200px] mx-auto py-4 flex justify-between items-center'>
        <Logo />

        <nav>
          <ul className='hidden md:flex gap-6 items-center'>
            <li>
              <NavLink
                to='courses'
                className={({ isActive }) =>
                  isActive ? 'text-purple-600' : 'text-gray-700'
                }
                end
              >
                Courses
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to='courses/mycourses'
                    className={({ isActive }) =>
                      isActive ? 'text-purple-600' : 'text-gray-700'
                    }
                    end
                  >
                    My Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='wishlist'
                    className={({ isActive }) =>
                      isActive ? 'text-purple-600' : 'text-gray-700'
                    }
                    end
                  >
                    Wishlist
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to='cart'
                    className={({ isActive }) =>
                      isActive ? 'text-purple-600' : 'text-gray-700'
                    }
                    end
                  >
                    Cart
                  </NavLink>
                </li> */}
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to='about'
                    className={({ isActive }) =>
                      isActive ? 'text-purple-600' : 'text-gray-700'
                    }
                    end
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='contact'
                    className={({ isActive }) =>
                      isActive ? 'text-purple-600' : 'text-gray-700'
                    }
                    end
                  >
                    Contact
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav>
          <ul className='flex gap-4 items-center'>
            {user ? (
              <button
                onClick={handleLogout}
                className='border p-2 px-4 rounded-md border-purple-600 bg-white text-purple-600'
              >
                Logout
              </button>
            ) : (
              <>
                <li>
                  <Link
                    to='/login'
                    className='p-2 px-4 border border-purple-500 bg-white rounded-md text-purple-500'
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to='/signup'
                    className='p-2 px-4 border border-purple-500 bg-purple-500 rounded-md text-white'
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
