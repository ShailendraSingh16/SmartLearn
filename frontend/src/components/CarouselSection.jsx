import { Carousel } from 'flowbite-react';
import { Link } from 'react-router-dom';

const data = [
  {
    image:
      'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Learn Web Development',
  },
  {
    image:
      'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Master the art of designing',
  },
  {
    image:
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Study Engineering',
  },
  {
    image:
      'https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'Learn Machine Learning',
  },
];

const CarouselSection = () => {
  const getBg = (url) => `bg-[url('${url}')]`;

  console.log(getBg(data[0].image));
  return (
    <div className='h-72 sm:h-84 md:h-[80vh]'>
      <Carousel className='carousel rounded-none' slideInterval={5000}>
        {data.map((d, i) => (
          <div
            key={i}
            className={
              `h-full flex justify-start items-end p-[5%] ` +
              `bg-[url('https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]`
            }
          >
            <div className='bg-white/10 backdrop-blur-lg text-white p-8 rounded-md'>
              <h1 className='font-semibold text-3xl'>{d.text}</h1>
              <p className='mt-2 text-gray-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
                soluta.
              </p>
              <Link
                className='px-4 py-2 rounded-md bg-purple-600 text-white inline-block mt-4 '
                to='courses?category=machine+learning'
              >
                Explore Courses
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default CarouselSection;
