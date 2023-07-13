import { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import { useAuth } from '../hooks/useAuth';
import { startLoading, stopLoading } from '../reducres/authReducers';
import { getMyCourses } from '../services/lib/user';

const MyCourses = () => {
  const { dispatch } = useAuth();
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        dispatch(startLoading());
        const res = await getMyCourses();
        console.log(res);

        if (res.status === 200 && res.data) {
          setCoursesData(res.data);
        }
        dispatch(stopLoading());
      } catch (error) {
        console.log(error.response);
        dispatch(stopLoading());
      }
    };
    getCourses();
  }, [dispatch]);

  return (
    <div className='container max-w-[1200px] w-[95%] mx-auto'>
      <h1 className='text-xl my-4 '>Continue Leanring</h1>
      <CourseList coursesData={coursesData} />
    </div>
  );
};
export default MyCourses;
