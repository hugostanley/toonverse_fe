import { Link } from 'react-router-dom';
import { useUserProfile, useUserData } from '@layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function UserAccount() {
  const { userData } = useUserData();
  const { data: userProfile, isPending } = useUserProfile();

  // console.log('USER:', userProfile)
  if (isPending || !userData) {
    return <p>Loading...</p>;
  }

  return (
    <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
      <div className='w-1/4 flex flex-col gap-3'>
        <h1 className='py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header'>
          Account Information
          <Link to='edit' className='p-2'>
            <small className='font-semibold text-sm'>
              <FontAwesomeIcon icon={faPenToSquare} className='h-1/2'/>
            </small>
          </Link>
        </h1>

        <h2 className='text-xl font-bold'>{`${userProfile?.first_name} ${userProfile?.last_name}`}</h2>
        <small className=''>BIlling Address: {userProfile?.billing_address}</small>
      </div>
    </section>
  );
}

export default UserAccount;
