import { useAuth } from '../../hooks/useAuth';

const AuthorProfile = () => {
  const {
    state: { user },
  } = useAuth();
  return (
    <div>
      <h1 className='text-2xl my-4'>Welcome, {user.name}</h1>
      <div>
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt=''
            className='w-24 h-24 rounded-full'
          />
        ) : (
          <div className='w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-2xl flex justify-center items-center rounded-full'>
            {user.name.split(' ')[0][0] + user.name.split(' ')[1][0]}
          </div>
        )}
      </div>
      <div className='my-4'>
        <h1 className='text-xl my-2'>{user.name}</h1>
        <p className='text-xs'>{user.email}</p>
        <div className='my-4'>
          <p>Description</p>
          {user?.description ? (
            <p>{user?.description}</p>
          ) : (
            <small className='text-xs'>No description provided</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
