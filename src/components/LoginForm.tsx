import { FormEvent, useState } from 'react';
import { usePostAuth } from '@hooks';
import { CFormInput } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  user?: {
    email: string;
    password: string;
  } | null;
  apiUrl: string;
  formClassName?: string;
  btnColor?: string;
}

function LoginForm({ user, apiUrl, formClassName, btnColor }: LoginFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const { error, isLoading, postAuth } = usePostAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    }

    try {
      await postAuth(apiUrl, { 
        body: requestBody
      }, (responseData) => {
        if (responseData && responseData.data.role === 'admin') {
          navigate('/admin');
        } else if (responseData && responseData.data.role === 'artist') {
          navigate('/w/dashboard');
        } else {
          navigate('/account');
        }
      });
    } catch (error) {
      console.error('Axios Error:', error);
    }
    
  }

  return (
    <section className={formClassName}>
      <form onSubmit={handleSubmit} className='space-y-4 py-2'>
        <CFormInput
          type="email" 
          id="floatingInput" 
          floatingClassName="mb-3" 
          floatingLabel="Email" 
          placeholder="name@example.com" 
          name='email'
          value={email} 
          required
          onChange={(e) => setEmail(e.target.value)}         
          className={`field__input focus:ring-${btnColor}`}  
        />

        <CFormInput 
          type="password" 
          id="floatingPassword" 
          floatingLabel="Password" 
          placeholder="Password" 
          name='password'
          value={password} 
          required
          onChange={(e) => setPassword(e.target.value)} 
          className={`field__input focus:ring-${btnColor}`}
        />


        {error && 
          <p className="text-red-500">{error}</p>
        }

        <div className='field__wrapper py-4'>
          <button
            type='submit'
            className={`bg-${btnColor} btn__primary`}
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