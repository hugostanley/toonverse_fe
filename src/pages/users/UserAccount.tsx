import { LogoutBtn } from '@components';
import { LOGOUT_URL } from '@utils';

function UserAccount() {
  return (
    <main className='flex flex-col gap-3 p-4'>
      Account page.

      <LogoutBtn apiUrl={LOGOUT_URL} redirectPath='/login' className='bg-blue' />
    </main>
  )
}

export default UserAccount
