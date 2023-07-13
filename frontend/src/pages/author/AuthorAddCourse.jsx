import { Label, Textarea, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { createCourse } from '../../services/lib/course';
import { useNavigate } from 'react-router-dom';

const AuthorAddCourse = () => {
  const {
    state: { user },
  } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '',
    category: [],
  });
  const [sections, setSections] = useState([
    {
      sectionTitle: '',
      videoLink: '',
    },
  ]);

  const { title, description, thumbnail, price, category } = values;

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSectionAdd = () => {
    const secs = [...sections];
    secs.push({
      sectionTitle: '',
      videoLink: '',
    });
    setSections(secs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createCourse({
        ...values,
        author: user._id,
        sections,
      });
      console.log(res);

      if (res.status === 201) {
        navigate('/author/courses');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-8 w-full my-8'>
      <div className='basis-1/3'>
        {/* title */}
        <div className='my-2'>
          <Label htmlFor='title' value='Course Title' />

          <TextInput
            id='title'
            name='title'
            placeholder='Enter course title'
            type='text'
            className='my-2'
            value={title}
            onChange={handleInputChange}
          />
        </div>

        {/* description */}
        <div className='my-2'>
          <Label htmlFor='description' value='Course Description' />

          <Textarea
            id='description'
            name='description'
            placeholder='Enter course description'
            type='text'
            className='my-2'
            value={description}
            onChange={handleInputChange}
          />
        </div>

        {/* thumbnail */}
        <div className='my-2'>
          <Label htmlFor='thumbnail' value='Thumbnail URL' />

          <TextInput
            id='thumbnail'
            name='thumbnail'
            placeholder='Enter course thumbnail'
            type='text'
            className='my-2'
            value={thumbnail}
            onChange={handleInputChange}
          />
        </div>

        {thumbnail ? (
          <div className='my-2'>
            <p className='my-2'>Preview: </p>
            <img src={thumbnail} className='w-full rounded-md' alt={title} />
          </div>
        ) : (
          ''
        )}

        {/* price */}
        <div className='my-2'>
          <Label htmlFor='price' value='Price' />

          <TextInput
            id='price'
            name='price'
            placeholder='Enter course price'
            type='text'
            className='my-2'
            value={price}
            onChange={handleInputChange}
          />
        </div>

        {/* categories */}
        <div className='my-2'>
          <div className='flex items-center'>
            <Label htmlFor='category' value='Category' />
            <small>(Separate by commas)</small>
          </div>

          <TextInput
            id='category'
            name='category'
            placeholder='Enter course category'
            type='text'
            className='my-2'
            value={category}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='basis-2/3 my-4'>
        <h3 className='text-lg'>Add course sections</h3>

        {sections.map((s, i) => (
          <div className='my-2' key={i}>
            <Label
              htmlFor={'sectionTitle-' + (i + 1)}
              value={'Section ' + (i + 1)}
            />

            <div className='flex items-center my-2 gap-2'>
              <div className='grow flex gap-2'>
                <TextInput
                  id={'sectionTitle' + (i + 1)}
                  name={'sectionTitle'}
                  placeholder='Enter section title'
                  type='text'
                  className='basis-1/2'
                  value={sections[i]['sectionTitle' + (i + 1)]}
                  onChange={(e) => {
                    let secs = [...sections];
                    secs[i].sectionTitle = e.target.value;
                    setSections(secs);
                  }}
                />
                <TextInput
                  id={'videoLink' + (i + 1)}
                  name={'videoLink' + (i + 1)}
                  placeholder='Enter the video link'
                  type='text'
                  className='basis-1/2'
                  value={sections[i]['videoLink' + (i + 1)]}
                  onChange={(e) => {
                    let secs = [...sections];
                    secs[i].videoLink = e.target.value;
                    setSections(secs);
                  }}
                />
              </div>

              {sections.length === i + 1 ? (
                <button
                  type='button'
                  onClick={handleSectionAdd}
                  className='bg-green-500 min-w-[150px] text-white p-2 px-4 rounded-md'
                >
                  Add Section
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}

        {/* <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/KKukXWN8ym0'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
          className='rounded-md'
        ></iframe> */}

        <div className='my-4'>
          <button
            type='submit'
            className='bg-purple-600 text-white rounded-md p-2 px-8'
          >
            Create Course
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthorAddCourse;
