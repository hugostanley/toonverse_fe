
import { GoogleOauth } from '@components';
import { LoginForm } from '@components';
import { LOGIN_URL } from '@utils';

function Login() {
  return (
    <>
    <main>
      <h1 className='p-4 border-b-2 border-gray-400/60'>
        Welcome back
      </h1>

   
      <GoogleOauth/>
      <LoginForm apiUrl={LOGIN_URL} redirectPath='/account' />
    </main>
    </>
    
  )
}

export default Login;
