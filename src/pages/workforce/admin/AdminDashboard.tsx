import { LogoutBtn } from '@components';
import { W_LOGOUT_URL } from '@utils';

function AdminDashboard() {
  return (
    <section>
      This is the Admin dashboard.

      <LogoutBtn apiUrl={W_LOGOUT_URL} redirectPath='/w/login' />
    </section>
  )
}

export default AdminDashboard
