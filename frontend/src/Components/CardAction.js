import { mutate } from 'swr';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useAuthContext } from '../Hooks/useAuthContext';

export default function CardAction({ d, type, url }) {
  const { user, UserId } = useAuthContext();
  const likePost = async (id) => {
    try {
      const response = await fetch('/api/user/Interactions/like', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          postId: id,
          type,
        }),
      });

      if (response.ok) {
        mutate(url);
      }
    } catch (err) {}
  };

  const unlikePost = async (id) => {
    try {
      const response = await fetch('/api/user/Interactions/unlike', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          postId: id,
          type,
        }),
      });
      if (response.ok) {
        mutate(url);
      }
      const result = await response.json();
    } catch (err) {}
  };
  return (
    <>
      {user ? (
        UserId && d.likes?.some((likedUserId) => likedUserId === String(UserId)) ? (
          <div className='flex items-center'>
            <GoHeartFill
              className='text-red-500 cursor-pointer'
              size={30}
              onClick={() => {
                unlikePost(d._id);
              }}
            />
          </div>
        ) : (
          <div className='flex items-center'>
            <GoHeart
              className='text-gray-800 cursor-pointer'
              size={30}
              onClick={() => {
                likePost(d._id);
              }}
            />
          </div>
        )
      ) : (
        ''
      )}
    </>
  );
}
