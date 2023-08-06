import { Boundary } from '../boundary';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function AddArtwork() {
  const { data, error } = useSWR('/api/admin/Category/Artworks', fetcher);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUploadProgress(0);
    setButtonDisabled(true);
    setShowProgressBar(true);

    const resetForm = () => {
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null);
      setImagePreview(null);
    };
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/admin/Artwork', true);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        setButtonDisabled(false);
        setShowProgressBar(false);

        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          toast.success('New Artwork Added');
          resetForm();
        } else {
          toast.error('Artwork Could not be Added');
        }
      }
    };

    xhr.send(formData);
  };

  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add New Beat']} size='small'>
          <form onSubmit={handleSubmit}>
            <div className='prose prose-sm prose-invert max-w-none'>
              <div className='mb-6'>
                <label className='text-md text-gray-100 m-2' htmlFor='categoryTitle'>
                  Title
                </label>

                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='txt'
                  id='categoryTitle'
                  name='categoryTitle'
                  placeholder='Enter Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='mb-6'>
                {imagePreview && (
                  <>
                    <label>Image Preview:</label>{' '}
                    <img src={imagePreview} alt='Preview' className='rounded-2xl ' />
                  </>
                )}

                <label className='text-md text-white m-2' htmlFor='file-input'>
                  Image
                </label>
                <input
                  type='file'
                  name='file-input'
                  id='file-input'
                  className='placeholder-gray-500
              bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white 
              file:bg-transparent file:border-0
              file:cursor-pointer	
              file:text-gray-500
              file:placeholder-gray-500'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </div>

              <div className='mb-6'>
                <label className='text-md text-white m-2' htmlFor='BeatCategory'>
                  Category
                </label>
                <select
                  className='bg-gray-900 text-sm appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  id='BeatCategory'
                  name='BeatCategory'
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value=''>Please Select</option>
                  {data &&
                    data.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className='mb-6'>
                <label className='text-md text-white m-2' htmlFor='Description'>
                  Description
                </label>
                <textarea
                  rows={5}
                  className='bg-gray-900 text-sm appearance-none border-2 border-gray-1100 resize-y rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  id='Description'
                  name='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='mb-6'>
                <label className='text-md text-gray-100 m-2' htmlFor='Price'>
                  Price
                </label>
                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='txt'
                  id='Price'
                  name='Price'
                  placeholder=''
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {showProgressBar && (
                  <div className='mb-6'>
                    <label>Upload Progress:</label>
                    <div className='relative pt-1'>
                      <div className='flex mb-2 items-center justify-between'>
                        <div>
                          <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200'>
                            {uploadProgress.toFixed(1)}%
                          </span>
                        </div>
                        <div className='text-right'>
                          <span className='text-xs font-semibold inline-block text-purple-600'>
                            {Math.round(uploadProgress)}%
                          </span>
                        </div>
                      </div>
                      <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200'>
                        <div
                          style={{ width: `${uploadProgress}%` }}
                          className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500'
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='flex flex-row-reverse p-2'>
                <button
                  type='submit'
                  className='text-md text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'
                  disabled={buttonDisabled}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </Boundary>
      </div>
    </div>
  );
}
