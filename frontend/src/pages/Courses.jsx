import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseList from '../components/CourseList';
import FilterBar from '../components/FilterBar';
import { useAuth } from '../hooks/useAuth';
import { startLoading, stopLoading } from '../reducres/authReducers';
import { getAllCourses } from '../services/lib/course';

const filters = [
  'All',
  'web development',
  'Frontend Development',
  'Javascript',
  'Backend development',
  'Machine learning',
  'design',
  'Microsofy Excel',
  'Data Science',
];

const Courses = () => {
  const { dispatch } = useAuth();
  const [coursesData, setCoursesData] = useState([]);
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const getCourses = async () => {
      try {
        dispatch(startLoading());
        const res = await getAllCourses(searchParams.get('category'));
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
  }, [dispatch, searchParams]);

  return (
    <div className='container max-w-[1200px] w-[95%] mx-auto flex'>
      <FilterBar filters={filters} />
      <div className='px-4'>
        <CourseList coursesData={coursesData} />
      </div>
    </div>
  );
};

export default Courses;
