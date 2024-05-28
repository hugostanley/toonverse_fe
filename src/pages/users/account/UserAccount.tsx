import { Link } from "react-router-dom";
import { useUserProfile, useUserData } from "@layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Spinner, LogoutBtn } from "@components";
import { LOGOUT_URL } from "@utils";

function UserAccount() {
  const { userData } = useUserData();
  const { data: userProfile, isPending } = useUserProfile();

  // console.log('USER:', userProfile)
  if (isPending || !userData) {
    return (
      <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
        <Spinner />
      </section>
    );
  }

  return (
    <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
      <div className='w-1/4 flex flex-col gap-3'>
        <div className='py-2 border-b-2 border-gray-400/60 flex text-3xl font-bold font-header'>
          <h1>Account Information</h1>
          <Link to='edit' className="flex items-center justify-center px-3 text-dark/45 hover:text-dark">
            <FontAwesomeIcon icon={faPenToSquare} className='h-1/2' />
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className='text-xl font-bold'>{`${userProfile?.first_name} ${userProfile?.last_name}`}</h2>
          <span className='text-sm'>
            BIlling Address: {userProfile?.billing_address}
          </span>
        </div>

        <small className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <LogoutBtn apiUrl={LOGOUT_URL} redirectPath='/login' className='font-light hover:underline underline-offset-4' />
        </small>
      </div>
      
      
      
    </section>
  );
}

export default UserAccount