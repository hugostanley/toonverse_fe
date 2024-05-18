import { LoginForm } from '@components';
import { W_LOGIN_URL } from '@utils';

function Login() {
  return (
    <main>
      <h1 className='p-4 border-b-2 border-gray-400/60'>
        Workforce Login
      </h1>

      <LoginForm apiUrl={W_LOGIN_URL} redirectPath='/w/dashboard' className='bg-yellow' />
    </main>
  )
}

export default Login
