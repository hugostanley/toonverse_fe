import { Link } from 'react-router-dom';
import { useUserProfile, useUserData } from '@layouts';

function UserAccount() {
  const { userData } = useUserData();
  const { data: userProfile, isPending } = useUserProfile();

  console.log('USER:', userProfile)
  if (isPending || !userData) {
    return <p>Loading...</p>;
  }

  return (
    <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
      <div className='w-1/4 flex flex-col gap-3'>
        <h1 className='py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold'>
          Account Information
          <Link to='edit' >
            <small className='font-semibold text-sm'>Edit</small>
          </Link>
        </h1>

        <p>First Name: {userProfile?.first_name}</p>
        <p>Surname: {userProfile?.last_name}</p>
        <p>Address: {userProfile?.billing_address}</p>
      </div>
    </section>
  )
}

export default UserAccount
