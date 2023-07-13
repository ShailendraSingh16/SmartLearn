import { Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  loginFailed,
  loginStart,
  loginSuccess,
} from '../reducres/authReducers';
import { loginService } from '../services/lib/auth';

const Login = () => {
  const {
    state: { user, loading, error },
    dispatch,
  } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = values;

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        dispatch(loginStart());
        const res = await loginService(values);

        // console.log(res);

        if (res.status === 200 && res.data?.user) {
          dispatch(loginSuccess(res.data?.user));
        }
      } catch (error) {
        console.log(error.response);
        dispatch(loginFailed(error.response.data.message));
      }
    } else {
      dispatch(loginFailed('All fields are required!'));
    }
  };

  useEffect(() => {
    if (user && user.role === 'author') {
      navigate('/author');
    } else if (user && user.role === 'admin') {
      navigate('/admin');
    } else if (user && user.role === 'user') {
      navigate('/courses');
    }
  }, [user, navigate]);

  return (
    <div className='flex justify-center items-center min-h-screen login'>
      <form
        onSubmit={handleFormSubmit}
        className='w-full max-w-[440px] mx-auto bg-white/70 backdrop-blur-md rounded-lg p-16'
      >
        <h1 className='text-3xl text-center mb-4 font-sembold'>
          Login to continue
        </h1>

        {/* email */}
        <div className='my-2'>
          <Label htmlFor='email' value='Your email' />

          <TextInput
            id='email'
            name='email'
            placeholder='user@gmail.com'
            type='email'
            className='my-2'
            value={email}
            onChange={handleInputChange}
          />
        </div>
        {/* password */}
        <div className='my-2'>
          <Label htmlFor='password' value='Your password' />

          <TextInput
            id='password'
            name='password'
            placeholder='********'
            type='password'
            className='my-2'
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className='my-4'>
          <button className='bg-purple-500 rounded-lg text-white py-3 text-center w-full'>
            {loading ? 'Loggin in...' : 'Login'}
          </button>
        </div>
        <div className='text-center text-red-500'>
          {error ? <p className='mb-4'>{error}</p> : ''}
        </div>
        <div className='text-center '>
          Don&apos;t have an account?
          <Link to='/signup' className='ml-2 text-blue-600'>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
