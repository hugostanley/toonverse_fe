import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL, setLocalStorage } from '@utils';

type LoginFormProps = {
  user?: {
    email: string;
    password: string;
  } | null;
  error?: string | null;
}

function LoginForm({ user, error }: LoginFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error || null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const headersObject = Object.fromEntries(response.headers.entries());

      const data = await response.json();
      console.log('Response data:', data);
      console.log('Headers:', headersObject);

      if (response.ok) {
        setLocalStorage('Headers', headersObject);
        navigate('/account')
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='w-1/2 p-4'>
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

        {errorMessage && 
          <p className="text-red-500">{errorMessage}</p>
        }

        <div className='field__wrapper'>
          <button
            type='submit'
            className='btn__primary bg-pink mt-6 font-bold'
            disabled={loading} 
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm;
