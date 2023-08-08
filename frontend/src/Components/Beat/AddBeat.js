import React, { useState } from 'react';
import { Boundary } from '../boundary';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import WavesurferComponent from '../WavesurferComponent';
const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function AddBeat() {
  const { data, error } = useSWR('/api/admin/Category/Beats', fetcher);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
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
      setFile(null);
      setPreviewUrl('');
    };

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/admin/Audio', true);

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
          toast.success('Beat Added Successfully');
          resetForm();
        } else {
          toast.error('Beat Could not Be Added ');
        }
      }
    };

    xhr.send(formData);
  };

  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20'>
      <div className='rounded-lg bg-black p-3.5 lg:p-6'>
        <Boundary labels={['Add Beat']} size='small'>
          <form>
            <div className='prose prose-sm prose-invert max-w-none'>
              <div className='mb-6'>
                <label className='text-md text-gray-100 m-2' htmlFor='Title'>
                  Title
                </label>
                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='txt'
                  id='Title'
                  name='Title'
                  placeholder='Enter Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='mb-6'>
                {previewUrl && (
                  <>
                    <label className='text-md text-white m-2' htmlFor='file-input'>
                      Audio
                    </label>
                    <WavesurferComponent audioUrl={previewUrl} />
                  </>
                )}
                <label className='text-md text-white m-2' htmlFor='file-input'>
                  Audio
                </label>
                <input
                  type='file'
                  name='file-input'
                  id='file-input'
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white file:bg-transparent file:border-0 file:cursor-pointer file:text-gray-500 file:placeholder-gray-500'
                  accept='audio/*'
                  onChange={handleFileChange}
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
                  onChange={(e) => {
                    const regex = /^\d+(\.\d{0,2})?$/;

                    if (regex.test(e.target.value) || e.target.value === '') {
                      setPrice(e.target.value);
                    }
                  }}
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
                  onClick={handleSubmit}
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
