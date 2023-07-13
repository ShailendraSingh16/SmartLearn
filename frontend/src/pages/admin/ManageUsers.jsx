/* eslint-disable react/prop-types */
import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { startLoading, stopLoading } from '../../reducres/authReducers';
import { getAllUsers } from '../../services/lib/user';

const ManageUsers = () => {
  const {
    state: { user, loading },
    dispatch,
  } = useAuth();
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const handleDelete = async (courseId) => {
    try {
      // const res = await deleteCourse(courseId);
      // if (res.status === 200) {
      //   props.setOpenModal(undefined);
      //   let updatedCourses = courses.filter((c) => c._id !== courseId);
      //   setCourses(updatedCourses);
      // }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(startLoading());
      try {
        const res = await getAllUsers('user');
        console.log(res);

        if (res.status && res.data) {
          setUsers(res.data);
        }
        dispatch(stopLoading());
      } catch (error) {
        console.log(error.response);
        dispatch(stopLoading());
      }
    };
    fetchUsers();
  }, [dispatch]);

  if (loading) {
    return (
      <table className='table-auto w-full border border-collapse rounded-md overflow-hidden'>
        <thead className='border'>
          <tr className='text-center grid gap-2 grid-cols-8'>
            <th className='col-span-1 py-4'>No</th>
            <th className='col-span-1 py-4'>Name</th>
            <th className='col-span-1 py-4'>Email</th>
            <th className='col-span-1 py-4'>Role</th>
            <th className='col-span-2 py-4'>Description</th>
            <th className='col-span-1 py-4'>Edit</th>
            <th className='col-span-1 py-4'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr
              key={i}
              className='text-center animate-pulse grid grid-cols-8 gap-2 items-center justify-center p-2 my-2'
            >
              <td className='py-3 col-span-1 bg-gray-100 rounded-md'></td>
              <td className='py-3 col-span-1 bg-gray-100 rounded-md'></td>
              <td className='py-3 col-span-1 bg-gray-100 rounded-md'></td>
              <td className='py-3 col-span-1 bg-gray-100 rounded-md'></td>
              <td className='py-3 col-span-2 bg-gray-100 rounded-md'></td>
              <td className='py-3 col-span-1 bg-gray-100 rounded-md'></td>
              <td className='py-3 col-span-1 bg-gray-100 rounded-md'></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className='table-auto w-full border border-collapse rounded-md overflow-hidden'>
          <thead className='border'>
            <tr className='text-center grid grid-cols-8'>
              <th className='col-span-1 py-4'>No</th>
              <th className='col-span-1 py-4'>Name</th>
              <th className='col-span-1 py-4'>Email</th>
              <th className='col-span-1 py-4'>Role</th>
              <th className='col-span-2 py-4'>Description</th>
              <th className='col-span-1 py-4'>Edit</th>
              <th className='col-span-1 py-4'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((c, i) => (
              <tr
                key={c._id}
                className='text-center grid grid-cols-8 items-center justify-center'
              >
                <td className='py-4 col-span-1'>{i + 1}</td>
                <td className='py-4 col-span-1 capitalize'>{c.name}</td>
                <td className='py-4 col-span-1'>
                  {/* {c.thumbnail ? (
                    <img
                      src={c.thumbnail}
                      className='w-24 aspect-video mx-auto rounded-md'
                      alt={c.title}
                    />
                  ) : (
                    'No image'
                  )} */}
                  {c.email}
                </td>
                <td className='py-4 col-span-1'>{c.role}</td>
                <td className='py-4 col-span-2'>
                  {c?.description ? c.description : 'null'}
                </td>
                <td className='py-4 col-span-1'>
                  <Link to={`/author/edit-course/${c._id}`}>
                    <button className='bg-green-700 text-white p-2 px-4 rounded-md'>
                      Edit
                    </button>
                  </Link>
                </td>
                <td className='py-4 col-span-1'>
                  <button
                    onClick={() => props.setOpenModal('pop-up')}
                    className='bg-red-700 text-white p-2 px-4 rounded-md'
                  >
                    Delete
                  </button>
                </td>
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
                        Are you sure you want to delete this course?
                      </h3>
                      <div className='flex justify-center gap-4'>
                        <Button
                          color='failure'
                          onClick={() => handleDelete(c._id)}
                        >
                          Yes, I&apos;m sure
                        </Button>
                        <Button
                          color='gray'
                          onClick={() => props.setOpenModal(undefined)}
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
