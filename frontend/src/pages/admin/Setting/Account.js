import { useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../../../Components/PageHeader';
import { Boundary } from '../../../Components/boundary';

export default function Account() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [RepeatedPassword, setRepeatedPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !oldPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (RepeatedPassword !== newPassword) {
      toast.error('Passwords Are not Matched');
      return;
    }
    setIsLoading(true);
    const response = await fetch('/api/admin/account/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    setIsLoading(false);

    const json = await response.json();
    if (response.ok) {
      toast.success(json);

      setNewPassword('');
      setOldPassword('');
      setRepeatedPassword('');
    } else {
      toast.error(json);
    }
  };

  return (
    <>
      <PageHeader title='Account Setting' />

      <div>
        <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20 '>
          <div className='rounded-lg bg-black  p-3.5 pt-8 lg:p-6'>
            <Boundary labels={['Change Password']} size='small'>
              <div className='prose prose-sm prose-invert max-w-none'>
                <label htmlFor='oldPassword'>Old Password</label>
                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='text'
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  value={oldPassword}
                  placeholder='Old Password'
                />
                <label htmlFor='newPassword'>New Password</label>
                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='text'
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  value={newPassword}
                  placeholder='New Password'
                />
                <label htmlFor='RepeatedPassword'>Repeat Password</label>
                <input
                  className='placeholder-gray-500 bg-gray-900 text-md appearance-none border-2 border-gray-1100 rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-gray-800 focus:border-zinc-800 focus:text-white'
                  type='text'
                  onChange={(e) => {
                    setRepeatedPassword(e.target.value);
                  }}
                  value={RepeatedPassword}
                  placeholder='Repeated Password'
                />
                <button
                  onClick={handleChangePassword}
                  className='text-md mt-4 w-full text-white bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-md'
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Change'}
                </button>
              </div>
            </Boundary>
          </div>
        </div>
      </div>
    </>
  );
}
