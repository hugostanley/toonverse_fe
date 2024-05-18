import { FormEvent, useState } from 'react';
import { usePostAuth } from '@hooks';

type SignupFormProps = {
  user?: {
    email: string;
    password: string;
    password_confirmation: string;
  } | null;
  apiUrl: string;
  redirectPath?: string;
  formClassName?: string;
  btnClassName?: string;
}

function SignupForm({ user, apiUrl, redirectPath, formClassName, btnClassName }: SignupFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [passwordConfirmation, setPasswordConfirmation] = useState(user?.password_confirmation || '');
  const { error, isLoading, postAuth } = usePostAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const requestBody = {
      email,
      password
    }

    try {
      await postAuth(apiUrl, { 
        body: requestBody
      }, redirectPath)
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <section className={formClassName}>
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
            className={`${btnClassName} btn__primary`}
            disabled={isLoading} 
          >
            {isLoading ? 'Creating your account' : 'Create Account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignupForm
