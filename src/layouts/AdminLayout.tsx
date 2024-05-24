import { Outlet } from 'react-router-dom';
import { WorkforceNavbar } from '@pages';
import { adminAccess } from '@utils';

function AdminLayout() {
  return (
    <main className='w-full h-full bg-ivory'>
      <WorkforceNavbar loaderFn={adminAccess} />
      <Outlet />
    </main>
  )
}

export default AdminLayout
