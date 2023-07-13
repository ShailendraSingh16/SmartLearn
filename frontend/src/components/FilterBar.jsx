/* eslint-disable react/prop-types */
import { Link, useSearchParams } from 'react-router-dom';

const FilterBar = ({ filters }) => {
  let [searchParams] = useSearchParams();

  return (
    <div className='min-h-screen border-r basis-1/5 py-4 pr-4'>
      <h2 className='text-xl'>Choose course type</h2>
      <div className='my-4 flex flex-wrap gap-2'>
        {filters.map((filter, i) => (
          <Link
            key={i}
            to={`/courses?category=${filter.toLowerCase()}`}
            className={
              searchParams.get('category') === filter.toLowerCase()
                ? `capitalize p-1 px-2 w-fit text-xs text-white bg-purple-500 rounded-md border border-purple-500 `
                : `capitalize p-1 px-2 w-fit text-xs text-purple-500 rounded-md border border-purple-500 `
            }
          >
            {filter}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
