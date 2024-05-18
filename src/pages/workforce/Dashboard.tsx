import { LogoutBtn } from '@components';
import { W_LOGOUT_URL } from '@utils';

function Dashboard() {
  return (
    <section>
      This is the workforce dashboard.

      <LogoutBtn apiUrl={W_LOGOUT_URL} redirectPath='/w/login' />
    </section>
  )
}

export default Dashboard
