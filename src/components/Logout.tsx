import { FormEvent } from 'react';
import { useFetch } from '@hooks';

type LogoutProps = {
  apiUrl: string;
  redirectPath: string,
  className?: string;
}

function Logout({ apiUrl, redirectPath, className }: LogoutProps) {
  const { error, isLoading, fetchData } = useFetch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetchData(apiUrl, { method: 'DELETE' }, redirectPath)
      localStorage.removeItem('Headers');
      localStorage.removeItem('AccountData');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='field__wrapper'>
        <button
          type='submit'
          className={className}
          disabled={isLoading} 
        >
          Logout
        </button>

        {error && 
          <p className="text-warningRed">{error}</p>
        }
      </div>
    </form>
  )
}

export default Logout
