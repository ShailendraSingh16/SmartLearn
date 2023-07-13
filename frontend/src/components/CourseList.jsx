/* eslint-disable react/prop-types */
import { useAuth } from '../hooks/useAuth';
import CourseCard from './CourseCard';

const CourseList = ({ coursesData }) => {
  const {
    state: { loading },
  } = useAuth();

  if (loading) {
    return (
      <div className='animate-pulse w-full grid my-4 p-8 py-4 gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className='w-auto max-w-[320px]'>
            <div className='bg-gray-200 h-32 w-full mb-2 aspect-video rounded-md'></div>
            <div className='bg-gray-100 h-5 w-full rounded-md'></div>
            <div className='bg-gray-50 h-2 mt-2 w-[50%] rounded-md'></div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className='basis-4/5  grid my-4 gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {coursesData.length === 0 ? (
        <p>No Courses of this category found!</p>
      ) : (
        coursesData.map((c) => <CourseCard c={c} key={c._id} />)
      )}
    </div>
  );
};

export default CourseList;
