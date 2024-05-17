import { FormEvent, useState } from 'react';
import { useFetchAuth } from '@hooks';

type SignupFormProps = {
  user?: {
    email: string;
    password: string;
    password_confirmation: string;
  } | null;
  apiUrl: string;
  redirectPath?: string;
}

function SignupForm({ user, apiUrl, redirectPath }: SignupFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [passwordConfirmation, setPasswordConfirmation] = useState(user?.password_confirmation || '');
  const { error, isLoading, fetchAuth } = useFetchAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      passwordConfirmation
    }

    try {
      await fetchAuth(apiUrl, { 
        method: 'POST', 
        body: requestBody
      }, redirectPath)
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <section className='w-1/3 p-4'>
      <form onSubmit={handleSubmit} className='space-y-4 py-2'>
        <div className='field__wrapper'>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className='field__text'
          />
        </div>

        <div className='field__wrapper'>
          <label>Password</label>
          <input 
            type="password"
            name='password'
            value={password} 
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)} 
            className='field__text'
          />
        </div>

        <div className='field__wrapper'>
          <label>Confirm Password</label>
          <input 
            type="password"
            name='password_confirmation'
            value={passwordConfirmation} 
            placeholder="******"
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
            className='field__text'
          />
        </div>

        {error && 
          <p className="text-red-500">{error}</p>
        }

        <div className='field__wrapper'>
          <button
            type='submit'
            className='btn__primary bg-pink mt-6 font-bold'
            disabled={isLoading} 
          >
            Register
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignupForm
