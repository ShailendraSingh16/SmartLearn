/* eslint-disable react/prop-types */
import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { startLoading, stopLoading } from '../reducres/authReducers';
import { getCourse } from '../services/lib/course';
import { enrollCourse } from '../services/lib/user';

const Course = () => {
  const {
    state: { user, loading },
    dispatch,
  } = useAuth();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const handleEnroll = async (courseId) => {
    try {
      const res = await enrollCourse(courseId);
      console.log(res);

      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      dispatch(startLoading());
      try {
        const res = await getCourse(courseId);
        console.log(res);
        setCourse(res.data);

        dispatch(stopLoading());
      } catch (error) {
        console.log(error.response);
        dispatch(stopLoading());
      }
    };
    fetchCourse();
  }, [courseId, dispatch, user._id]);

  useEffect(() => {
    if (course) {
      const enrolled = course.enrolledUsers.find((u) => u === user._id);
      enrolled && setIsEnrolled(true);
    }
  }, [course, user._id]);

  console.log('enrolled: ', isEnrolled);

  if (loading) {
    return (
      <div className='container max-w-[1200px] mx-auto w-[95%]'>
        <div className='animate-pulse my-4 flex gap-8 min-h-[50vh]'>
          <div className='basis-2/3'>
            <div className='w-full h-80 bg-gray-200'></div>
            <div className='mt-10 flex gap-4'>
              <div className='w-20 h-20 bg-gray-200'></div>
              <div className='space-y-4'>
                <div className='w-60 h-5 bg-gray-200'></div>
                <div className='w-32 h-5 bg-gray-200'></div>
              </div>
            </div>
          </div>
          <div className='basis-1/3 space-y-2'>
            <div className='w-full h-16 bg-gray-200'></div>
            <div className='w-full h-16 bg-gray-200'></div>
            <div className='w-full h-16 bg-gray-200'></div>
            <div className='w-full h-16 bg-gray-200'></div>
            <div className='w-full h-16 bg-gray-200'></div>
            <div className='w-full h-16 bg-gray-200'></div>
            <div className='w-full h-16 bg-gray-200'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container max-w-[1200px] mx-auto w-[95%]'>
      <div className='block md:flex gap-8 my-8 min-h-[80vh]'>
        {course ? (
          <>
            <div className='basis-2/3 mb-8 md:mb-0'>
              {isEnrolled ? (
                <iframe
                  className='w-full aspect-video rounded-md sticky top-20'
                  src='https://www.youtube.com/embed/35EQXmHKZYs'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className='w-full aspect-video rounded-md'
                />
              )}
              <div className='mt-10 flex items-center gap-4'>
                {course.author?.profilePic ? (
                  <img
                    src={course.author?.profilePic}
                    alt=''
                    className='w-16 h-16 rounded-full'
                  />
                ) : (
                  <div className='w-16 h-16 uppercase bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-2xl flex justify-center items-center rounded-full'>
                    {course.author.name.split(' ')[0][0] +
                      course.author.name.split(' ')[1][0]}
                  </div>
                )}

                <div className='space-y-2'>
                  <h1 className='text-xl capitalize'>{course.author.name}</h1>
                  <div className='text-slate-500 text-xs'>
                    {new Date(course.createdAt).toDateString()}
                  </div>
                </div>

                {isEnrolled ? (
                  ''
                ) : (
                  <button
                    onClick={() => props.setOpenModal('pop-up')}
                    className='ml-auto text-xl bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 text-white p-2 px-8 rounded-md'
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? 'Already Enrolled' : 'Enroll'}
                  </button>
                )}

                <Modal
                  show={props.openModal === 'pop-up'}
                  size='md'
                  popup
                  onClose={() => props.setOpenModal(undefined)}
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className='text-center'>
                      <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                        Pay {course.price} to enroll in this course?
                      </h3>
                      <div className='flex justify-center gap-4'>
                        <Button
                          color='success'
                          onClick={() => handleEnroll(course._id)}
                        >
                          Pay {course.price}
                        </Button>
                        <Button
                          color='failure'
                          onClick={() => props.setOpenModal(undefined)}
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
            <ul className='basis-1/3'>
              <h1 className='text-xl mb-2'>Course curriculum</h1>
              {course.sections.map((s, i) => (
                <li
                  key={i}
                  className='flex gap-4 p-3 cursor-pointer rounded-md hover:bg-purple-100'
                >
                  <div className='w-12 h-12 rounded-md bg-purple-600 text-white flex justify-center items-center'>
                    {i + 1}
                  </div>
                  <div>
                    <small className='text-xs'>Part {i + 1}</small>
                    <p className='text-lg capitalize'>{s.sectionTitle}</p>
                  </div>
                </li>
              ))}
              {course.sections.map((s, i) => (
                <li
                  key={i}
                  className='flex gap-4 p-3 cursor-pointer rounded-md hover:bg-purple-100'
                >
                  <div className='w-12 h-12 rounded-md bg-purple-600 text-white flex justify-center items-center'>
                    {i + 1}
                  </div>
                  <div>
                    <small className='text-xs'>Part {i + 1}</small>
                    <p className='text-lg capitalize'>{s.sectionTitle}</p>
                  </div>
                </li>
              ))}
              {course.sections.map((s, i) => (
                <li
                  key={i}
                  className='flex gap-4 p-3 cursor-pointer rounded-md hover:bg-purple-100'
                >
                  <div className='w-12 h-12 rounded-md bg-purple-600 text-white flex justify-center items-center'>
                    {i + 1}
                  </div>
                  <div>
                    <small className='text-xs'>Part {i + 1}</small>
                    <p className='text-lg capitalize'>{s.sectionTitle}</p>
                  </div>
                </li>
              ))}
              {course.sections.map((s, i) => (
                <li
                  key={i}
                  className='flex gap-4 p-3 cursor-pointer rounded-md hover:bg-purple-100'
                >
                  <div className='w-12 h-12 rounded-md bg-purple-600 text-white flex justify-center items-center'>
                    {i + 1}
                  </div>
                  <div>
                    <small className='text-xs'>Part {i + 1}</small>
                    <p className='text-lg capitalize'>{s.sectionTitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Course;
