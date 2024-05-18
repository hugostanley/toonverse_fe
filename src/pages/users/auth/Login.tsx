
import { GoogleOauth } from '@components';
import { LoginForm } from '@components';
import { LOGIN_URL } from '@utils';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className='relative w-full h-full flex flex-col justify-center items-center bg-pink'>
      <div className='z-10 bg-ivory/45 backdrop-blur-sm border-2 border-dark rounded-2xl shadow-xl w-full max-w-[420px] h-fit flex flex-col gap-3 py-8 px-10'>
        <Link to='/' className='w-full grid place-items-center mb-4'>
          <img
            src="/src/assets/temp-logo.png"
            alt="Logo"
            className="h-12 w-42"
          />
        </Link>
        
        <h1 className='text-3xl tracking-widest font-black px-2'>
          Sign in
        </h1>

        <div className='br w-full h-16 p-2'>
          OmniAuth Block
        </div>

        <LoginForm apiUrl={LOGIN_URL} redirectPath='/account' btnClassName='bg-yellow' />

        <Link to='/register' className='px-2 hover:underline hover:underline-offset-4 hover:font-bold'>
          <small>
            No account yet? Register
          </small>
        </Link>

        <img
          src="/src/assets/doodle_neub.png"
          alt="Logo"
          className="absolute -bottom-8 -left-[20%] rotate-[45deg] w-36 z-10"
        />
      </div>

      <img
        src="/src/assets/chooseYourStyle.png"
        alt="Logo"
        className="fixed bottom-0 left-[60%] h-5/6"
      />
      
      <img
        src="/src/assets/star_neub.png"
        alt="Logo"
        className="absolute top-16 left-1/2 h-24 aspect-square z-10"
      />

      <img
        src="/src/assets/star_neub.png"
        alt="Logo"
        className="absolute top-1/2 left-24 h-42 -rotate-6 aspect-square z-10"
      />

      <img
        src="/src/assets/heart_neub.png"
        alt="Logo"
        className="absolute bottom-24 right-24 rotate-12 h-36 aspect-square z-10"
      />

      <img
        src="/src/assets/flower_neub.png"
        alt="Logo"
        className="fixed top-6 -left-8 w-24 aspect-square z-10"
      />

      <img
        src="/src/assets/asterisk_neub.png"
        alt="Logo"
        className="fixed -top-8 -right-8 w-36 aspect-square z-10"
      />

      <img
        src="/src/assets/bob_head.png"
        alt="Logo"
        className="fixed top-0 left-[10%] rotate-180 h-1/2 aspect-square z-10"
      />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fixed bottom-0 left-0 z-0'><path fill="#FDF7E1" fillOpacity="1" d="M0,0L48,37.3C96,75,192,149,288,165.3C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </main>
    </>
    
  )
}

export default Login;
