import { Checkbox, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { setError, startLoading, stopLoading } from '../reducres/authReducers';
import { signupService } from '../services/lib/auth';

const Signup = () => {
  const {
    state: { user, loading, error },
    dispatch,
  } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    isInstructor: '',
  });
  const { name, email, password, isInstructor } = values;

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
        dispatch(startLoading());
        const res = await signupService({
          ...values,
          role: isInstructor ? 'author' : 'user',
        });

        // console.log(res);

        if (res.status === 201) {
          dispatch(stopLoading());
          navigate('/login');
        }
      } catch (error) {
        console.log(error.response);
        dispatch(stopLoading());
        dispatch(setError(error.response.data.message));
      }
    } else {
      dispatch(setError('All fields are required!'));
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
    <div className='flex justify-center items-center min-h-screen signup '>
      <form
        onSubmit={handleFormSubmit}
        className='w-full max-w-[440px] mx-auto bg-white/70 backdrop-blur-md rounded-lg p-16'
      >
        <h1 className='text-3xl mb-4 font-sembold'>Create an account</h1>
        {/* name */}
        <div className='my-2'>
          <Label htmlFor='name' value='Your name' />

          <TextInput
            id='name'
            name='name'
            placeholder='Ram Das'
            type='text'
            className='my-2'
            value={name}
            onChange={handleInputChange}
          />
        </div>
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
        {/* is instructor */}
        <div className='flex items-center gap-2 my-4'>
          <Checkbox
            id='remember'
            name='isInstructor'
            value={isInstructor}
            onChange={() =>
              setValues({
                ...values,
                isInstructor: !values.isInstructor,
              })
            }
          />
          <Label htmlFor='remember'>Register as an instructor</Label>
        </div>
        <div className='my-8'>
          <button className='bg-purple-500 rounded-lg text-white py-3 text-center w-full'>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
        {error ? <p className='text-red-500 text-center mb-4'>{error}</p> : ''}
        <div className='text-center '>
          Already have an account?
          <Link to='/login' className='ml-2 text-blue-600'>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
