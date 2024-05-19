import { GoogleOAuth, SignupForm } from '@components';
import { REGISTER_URL } from '@utils';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <main className='relative w-full h-full flex flex-col justify-center items-center bg-yellow z-0'>
      <div className='z-20 bg-ivory/45 backdrop-blur-xl border-4 border-dark rounded-2xl shadow-2xl w-full max-w-[480px] h-fit flex flex-col gap-3 py-8 px-14'>
        <Link to='/' className='w-full grid place-items-center mb-4'>
          <img
            src="/src/assets/temp-logo.png"
            alt="Logo"
            className="h-12 w-42"
          />
        </Link>
        
        <h1 className='text-5xl tracking-widest font-black px-2'>
          Register
        </h1>

        <div className='w-full h-16 p-2 mt-2'>
          <GoogleOAuth />
        </div>

        <span className='w-full text-center text-sm font-bold'>or</span>

        <SignupForm apiUrl={REGISTER_URL} redirectPath='/account' btnColor='pink'/>

        <Link to='/login' className='px-2 font-bold hover:underline hover:underline-offset-4 hover:font-extrabold'>
          <small>
            Already have a account? Log in
          </small>
        </Link>

        <img
          src="/src/assets/doodle_neub.png"
          alt="Logo"
          className="absolute -bottom-8 -left-[20%] rotate-[45deg] w-36 z-10"
        />

        <img
          src="/src/assets/star_neub.png"
          alt="Logo"
          className="absolute -top-16 left-1/2 h-24 rotate-12 aspect-square z-20"
        />
      </div>

      <img
        src="/src/assets/star_neub.png"
        alt="Logo"
        className="absolute bottom-24 left-24 h-42 -rotate-6 aspect-square z-20"
      />

      <img
        src="/src/assets/smiley_neub.png"
        alt="Logo"
        className="absolute top-1/4 left-[20%] -rotate-12 h-1/4 aspect-square z-20"
      />

      <img
        src="/src/assets/flower_neub.png"
        alt="Logo"
        className="fixed top-[5%] left-12 rotate-12 h-24 aspect-square z-10"
      />

      <img
        src="/src/assets/heart_neub.png"
        alt="Logo"
        className="fixed top-[12%] left-24 rotate-12 h-32 aspect-square z-10"
      />      

      <img
        src="/src/assets/asterisk_neub.png"
        alt="Logo"
        className="fixed -top-8 -right-6 w-36 aspect-square z-10"
      />

      <img
        src="/src/assets/doodle_neub.png"
        alt="Logo"
        className="absolute top-4 right-1/4 -rotate-12 w-24 z-10"
      />

      <img
        src="/src/assets/flower_neub.png"
        alt="Logo"
        className="fixed bottom-[10%] right-[10%] h-16 aspect-square z-20"
      />

      <img
        src="/src/assets/hero-bg.png"
        alt="Logo"
        className="fixed bottom-[20%] right-0 w-[60%] z-10"
      /> 

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fixed top-0 left-0 z-0 rotate-180'><path fill="#ffed97" fillOpacity="1" d="M0,192L80,192C160,192,320,192,480,208C640,224,800,256,960,240C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fixed -bottom-24 left-0 z-10 rotate-2'><path fill="#FDF7E1" fillOpacity="1" d="M0,160L80,138.7C160,117,320,75,480,69.3C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </main> 
  )
}

export default Register
