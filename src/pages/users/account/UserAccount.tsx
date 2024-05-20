import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile, useUserData } from '@layouts';

function UserAccount() {
  const { userData } = useUserData();
  const { data: userProfile, error, isPending } = useUserProfile();
  const navigate = useNavigate();

  console.log('USER:', userProfile)

  useEffect(() => {
    if (!isPending && !userProfile) {
      navigate(`${userData?.id}/edit`);
    }
  }, [isPending, userProfile, userData, navigate]);

  if (isPending || !userData) {
    return <p>Loading...</p>;
  }

  return (
    <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
      <div className='w-1/4 flex flex-col gap-3'>
        <h1 className='py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold'>
          Account Information
          <Link to={`${userData.id}/edit`} >
            <small className='font-semibold text-sm'>Edit</small>
          </Link>
        </h1>

        <p>First Name: {userProfile?.first_name}</p>
        <p>Surname: {userProfile?.last_name}</p>
        <p>Address: {userProfile?.billing_address}</p>
      </div>

      {error && 
        <p className="text-red-500">{error.message}</p>
      }
    </section>
  )
}

export default UserAccount
