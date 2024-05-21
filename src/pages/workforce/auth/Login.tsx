import { LoginForm } from '@components';
import { W_LOGIN_URL } from '@utils';
import { Link } from 'react-router-dom';

function Login() {

  return (
    <main className='relative w-full h-full flex flex-col justify-center items-center bg-ivory overflow-hidden'>
      <div className='absolute -top-[35%] left-0 rotate-12 bg-green/70 w-1/2 aspect-square'></div>
      <div className='absolute bottom-0 right-0 w-full h-5/6 grid place-items-center'>
        <img
          src="/src/assets/noodle_write.png"
          alt="Logo"
          className="mx-auto w-[35%] aspect-square -rotate-12"
        />
      </div>

      <section className='w-full h-full z-10 flex'>
        <div className='w-2/3 h-full'></div>

        <div className='w-1/3 h-5/6 flex items-center px-10'>
          <div className='w-full max-w-[420px] flex flex-col gap-3 py-8 pl-12'>
            <Link to='/' className='w-full grid place-items-center mb-4'>
              <img
                src="/src/assets/temp-logo.png"
                alt="Logo"
                className="h-12 w-42"
              />
              <small>workforce</small>
            </Link>
            
            <h1 className='text-5xl tracking-widest font-black px-2'>
              Sign in
            </h1>

            <LoginForm apiUrl={W_LOGIN_URL} formClassName='w-full py-4' btnColor='pink' />
          </div>
        </div>        
      </section>
    </main>
  )
}

export default Login
