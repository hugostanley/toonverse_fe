import { LogoutBtn } from '@components';
import { W_LOGOUT_URL } from '@utils';

function AdminDashboard() {
  return (
    <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
      This is the Admin dashboard.

      <LogoutBtn apiUrl={W_LOGOUT_URL} redirectPath='/w/login' />
    </section>
  )
}

export default AdminDashboard
