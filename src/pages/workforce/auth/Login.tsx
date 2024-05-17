import { LoginForm } from '@components';
import { W_LOGIN_URL } from '@utils';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className='w-full h-full flex flex-col justify-center items-center bg-pink'>
      <section className='w-5/6 h-fit z-10 flex'>
        <div className='w-[55%] grid place-items-end'>
          <div className='z-10 bg-ivory/45 backdrop-blur-sm border-2 border-dark rounded-2xl shadow-xl w-full max-w-[420px] flex flex-col gap-3 py-8 px-10'>
            <Link to='/' className='w-full grid place-items-center mb-3'>
              <img
                src="/src/assets/temp-logo.png"
                alt="Logo"
                className="h-6 w-28"
              />
              <small>workforce</small>
            </Link>
            
            <h1 className='text-3xl tracking-widest font-black px-2'>
              Sign in
            </h1>

            <div className='br w-full h-16 p-2'>
              OmniAuth Block
            </div>

            <LoginForm apiUrl={W_LOGIN_URL} redirectPath='/w/dashboard' formClassName='w-full pb-4' btnClassName='bg-yellow' />

            {/* <Link to='/register' className='px-2 hover:underline hover:underline-offset-4 hover:font-bold'>
              <small>
                No account yet? Register
              </small>
            </Link> */}
          </div>
        </div>

        <div className='relative w-[45%]'>
          <img
            src="/src/assets/noodle_write.png"
            alt="Logo"
            className="absolute -left-20 w-[80%] aspect-square -rotate-6"
          />

        </div>

        
      </section>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fixed bottom-0 left-0 z-0'><path fill="#FDF7E1" fillOpacity="1" d="M0,0L48,37.3C96,75,192,149,288,165.3C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </main>
  )
}

export default Login
