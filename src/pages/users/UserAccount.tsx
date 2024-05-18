import { useLoaderData } from 'react-router-typesafe';
import { useQuery } from '@tanstack/react-query';
import { LogoutBtn } from '@components';
import { ALL_USERS, LOGOUT_URL, userAccess } from '@utils';
import { useFetch } from '@hooks';

type User = {
  email: string;
  first_name: string;
  last_name: string;
  billing_address: string;
};

function UserAccount() {
  const { id } = useLoaderData<typeof userAccess>();
  const { fetchData } = useFetch();
  const { data: queryData, error: queryError, isLoading: queryIsLoading } = useQuery<User[]>({
    queryKey: ['currentUserProfile', id],
    queryFn: async () => {
      const userData = await fetchData(ALL_USERS, { method: 'GET' });
      return userData;
    },
  });

  // const user = queryData?.[0] ?? null;
  const user = Array.isArray(queryData) && queryData.length > 0 ? queryData[0] : null;
  console.log('QUERY DATA:', queryData)

  if (queryIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className='flex flex-col gap-3 p-4'>
      <h1 className='p-4 border-b-2 border-gray-400/60'>
        Account Information
      </h1>

      <p>Email: {user?.email}</p>
      <p>First Name: {user?.first_name}</p>
      <p>Surname: {user?.last_name}</p>
      <p>Address: {user?.billing_address}</p>

      {queryError && 
          <p className="text-red-500">{queryError.message}</p>
        }

      <LogoutBtn apiUrl={LOGOUT_URL} redirectPath='/login' className='bg-blue' />
    </main>
  );
}

export default UserAccount;
