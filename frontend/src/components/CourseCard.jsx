/* eslint-disable react/prop-types */
import { BookmarkIcon, StarIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as SolidBookMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  addToWishList,
  getWishList,
  removeFromWishList,
} from '../services/lib/user';

const CourseCard = ({ c }) => {
  const [isWishListed, setIsWishListed] = useState(false);
  const { pathname } = useLocation();

  const handleAddToWishList = async () => {
    try {
      const res = isWishListed
        ? await removeFromWishList(c._id)
        : await addToWishList(c._id);

      console.log(res);

      if (res.status === 200) {
        console.log(pathname);
        setIsWishListed(!isWishListed);
      }

      if (isWishListed && pathname === '/wishlist') {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const checkIsWishlisted = async () => {
      try {
        const res = await getWishList();

        console.log(res);

        let list = res.data;
        const isFound = list.find((l) => l._id === c._id);

        console.log('found: ', isFound);

        if (isFound) {
          setIsWishListed(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    checkIsWishlisted();
  }, [c._id]);

  return (
    <div>
      <Link to={`/courses/${c._id}`} key={c._id}>
        <img
          src={c?.thumbnail}
          alt={c.title}
          className='block w-full rounded-lg aspect-video h-auto object-cover'
        />
        <h2 className='text-lg font-semibold my-2'>{c.title}</h2>
      </Link>

      {c.rating ? (
        <div className='flex gap-1 items-center'>
          <StarIcon className='w-4 h-4 text-yellow-300' /> {c?.rating}
        </div>
      ) : (
        ''
      )}

      <div className='flex items-center justify-between'>
        <p className='text-base my-2 capitalize'>{c.author.name}</p>{' '}
        {!isWishListed ? (
          <BookmarkIcon
            onClick={handleAddToWishList}
            title='Add to Wishlist'
            className='h-6 w-6 text-gray-900'
          />
        ) : (
          <SolidBookMarkIcon
            onClick={handleAddToWishList}
            title='Remove from Wishlist'
            className='h-6 w-6 text-gray-900'
          />
        )}
      </div>
    </div>
  );
};

export default CourseCard;
