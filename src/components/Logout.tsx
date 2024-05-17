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
          className={`${className} btn__primary w-1/4 mt-6 font-bold`}
          disabled={isLoading} 
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>

        {error && 
          <p className="text-red-500">{error}</p>
        }
      </div>
    </form>
  )
}

export default Logout
