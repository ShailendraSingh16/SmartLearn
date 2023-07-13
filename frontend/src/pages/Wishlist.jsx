import { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { useAuth } from '../hooks/useAuth';
import { startLoading, stopLoading } from '../reducres/authReducers';
import { getWishList } from '../services/lib/user';

const Wishlist = () => {
  const {
    state: { loading },
    dispatch,
  } = useAuth();
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        dispatch(startLoading());
        const res = await getWishList();
        console.log(res);

        if (res.status === 200) setWishList(res.data);
        dispatch(stopLoading());
      } catch (error) {
        console.log(error.response);
        dispatch(stopLoading());
      }
    };
    getCourses();
  }, [dispatch]);

  if (loading) {
    return <p>Fetching wishlist...please wait</p>;
  }

  return (
    <div className='container w-[95%] max-w-[1200px] mx-auto my-8'>
      <h1 className='text-xl my-4 '>Your Wishlist</h1>
      {wishList.length === 0 ? (
        <div className='flex min-h-[50vh] flex-col justify-center items-center'>
          <img
            src='https://img.freepik.com/free-vector/empty-concept-illustration_114360-1253.jpg?w=2000'
            alt=''
            className='w-96 h-auto aspect-square mx-auto'
          />
          <p className='text-center'>Your wishlist is empty!</p>
        </div>
      ) : (
        <CourseList coursesData={wishList} />
      )}
    </div>
  );
};

export default Wishlist;
