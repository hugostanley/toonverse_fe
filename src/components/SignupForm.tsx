import { FormEvent, useState } from 'react';
import { usePostAuth } from '@hooks';
import { CFormInput } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@components';

type SignupFormProps = {
  user?: {
    email: string;
    password: string;
    password_confirmation: string;
  } | null;
  apiUrl: string;
  formClassName?: string;
  btnColor?: string;
}

function SignupForm({ user, apiUrl, formClassName, btnColor }: SignupFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [passwordConfirmation, setPasswordConfirmation] = useState(user?.password_confirmation || '');
  const { error, isLoading, postAuth } = usePostAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      password_confirmation: passwordConfirmation
    }

    try {
      await postAuth(apiUrl, { 
        body: requestBody
      }, (responseData) => {
        if (responseData && responseData.data.role === undefined) {
          navigate('/account/edit');
        }
      })
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

        <CFormInput 
          type="password" 
          id="floatingPasswordConfirmation" 
          floatingLabel="Confirm Password" 
          placeholder="Confirm Password" 
          name='password_confirmation'
          value={passwordConfirmation} 
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)} 
          className={` border-2 border-dark focus:border-none focus:ring-4 focus:ring-${btnColor}`}
        />

        {error && 
          <p className="text-warningRed">{error}</p>
        }

        <div className='field__wrapper py-4'>
          <button
            type='submit'
            className={`bg-${btnColor} btn__primary`}
            disabled={isLoading} 
          >
            {isLoading ? <Spinner/> : 'Create Account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignupForm
