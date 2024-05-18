import { FormEvent, useState } from 'react';
import { usePostAuth } from '@hooks';

type LoginFormProps = {
  user?: {
    email: string;
    password: string;
  } | null;
  apiUrl: string;
  redirectPath?: string;
  formClassName?: string;
  btnClassName?: string;
}

function LoginForm({ user, apiUrl, redirectPath, formClassName, btnClassName }: LoginFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
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
      <form onSubmit={handleSubmit} className='space-y-4'>
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

        {error && 
          <p className="text-red-500">{error}</p>
        }

        <div className='field__wrapper py-4'>
          <button
            type='submit'
            className={`${btnClassName} btn__primary`}
            disabled={isLoading} 
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm