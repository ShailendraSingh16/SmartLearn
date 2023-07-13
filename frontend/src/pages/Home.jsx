import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarouselSection from '../components/CarouselSection';
import CourseList from '../components/CourseList';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { getAllCourses } from '../services/lib/course';

const Home = () => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await getAllCourses();
        // console.log(res);

        if (res.status === 200 && res.data) {
          setCoursesData(res.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getCourses();
  }, []);

  return (
    <div className='bg-gray-50'>
      <CarouselSection />
      <Features />
      <div className='container w-[95%] max-w-[1200px] mx-auto py-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>Explore variety of courses</h1>
          <Link to='/courses' className='text-blue-600'>
            View more
          </Link>
        </div>
        <CourseList coursesData={coursesData} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
