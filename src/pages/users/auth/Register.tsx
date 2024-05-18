import { SignupForm } from '@components';
import { REGISTER_URL } from '@utils';

function Register() {
  return (
    <main>
      <h1 className='p-4 border-b-2 border-gray-400/60'>
        Sign up
      </h1>

      <SignupForm apiUrl={REGISTER_URL} redirectPath='/account' />
    </main>
  )
}

export default Register
