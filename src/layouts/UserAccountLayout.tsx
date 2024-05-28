
import { Outlet, useOutletContext } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@components';
import { ALL_USERS, apiClient, userAccess } from '@utils';

type LoaderData = {
  id: number;
  email: string
}

type User = {
  first_name: string;
  last_name: string;
  billing_address: string;
  id: number;
}

type LoaderContext = { 
  userData: LoaderData | null;
}

type ProfileContext = {
  data: User | null;
  isPending?: boolean;
  isError?: boolean;
}

export function useUserData() {
  return useOutletContext<LoaderContext>();
}

export function useUserProfile() {
  return useOutletContext<ProfileContext>();
}

function UserAccountLayout() {
  const { id , email } = useLoaderData<typeof userAccess>();
  const [userData, setUserData] = useState<LoaderData | null>({ id, email });
  const { data, isPending, isError } = useQuery<User>({
    queryKey: ['currentUserProfile', id],
    queryFn: async () => {
      const response = await apiClient.get(ALL_USERS);
      return Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
    },
  });

  // console.log('USER PROFILE:', data)
  useEffect(() => {
    setUserData({
      id, 
      email,
    })
  }, [id, email])
  
  return (
    <main className='w-full h-full bg-ivory flex flex-col'>
      <div className='h-32'>
        <Navbar />
      </div>      
      <Outlet context={{ userData, data: data ?? null, isPending, isError } satisfies LoaderContext & ProfileContext} />
      
   
    </main>
  )
}

export default UserAccountLayout