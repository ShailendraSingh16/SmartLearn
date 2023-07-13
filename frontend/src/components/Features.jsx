import { ArrowTrendingUpIcon } from '@heroicons/react/24/solid';

const data = [
  {
    bgColor: '',
    title: 'Progress tracking and Certifications',
    icon: <ArrowTrendingUpIcon className='h-6 w-6 text-white' />,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit delectus accusamus',
  },
  {
    bgColor: '',
    title: 'Diverse course selection',
    icon: <ArrowTrendingUpIcon className='h-6 w-6 text-white' />,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit delectus accusamus',
  },
  {
    bgColor: '',
    title: 'Accessibility and Convinience',
    icon: <ArrowTrendingUpIcon className='h-6 w-6 text-white' />,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit delectus accusamus',
  },
  {
    bgColor: '',
    title: 'Interative learning experience',
    icon: <ArrowTrendingUpIcon className='h-6 w-6 text-white' />,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugit delectus accusamus',
  },
];

const Features = () => {
  return (
    <div className='container py-12 max-w-[1080px] w-[95%] mx-auto'>
      <p className='font-semibold text-center uppercase leading-relaxed text-xs text-purple-500'>
        Why choose us
      </p>
      <h1 className='text-2xl sm:text-3xl md:text-4xl text-center my-8 w-[80%] md:max-w-[50%] mx-auto'>
        Dive into online courses on diverse subjects
      </h1>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {data.map((d, i) => (
          <div
            key={i}
            className='bg-white/30 backdrop-blur-md shadow-sm rounded-md p-4 px-6 border border-gray-100'
          >
            <div className='bg-purple-600 w-fit p-3 rounded-md shadow-lg'>
              {d.icon}
            </div>
            <h2 className='text-xl mt-4 mb-2'>{d.title}</h2>
            <p className='text-sm text-gray-500'>{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Features;
