import { FormEvent } from 'react';
import { LOGOUT_URL } from '@utils';
import { useFetch } from '@hooks';

function UserAccount() {
  const { error, isLoading, fetchData } = useFetch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetchData(LOGOUT_URL, { method: 'DELETE' }, '/login')
      localStorage.removeItem('Headers');
    } catch (error) {
      console.error('Login error:', error);
    }
  }
  return (
    <main className='flex flex-col gap-3 p-4'>
      Account page.

      <form onSubmit={handleSubmit}>
        <div className='field__wrapper'>
          <button
            type='submit'
            className='btn__primary w-1/4 mt-6 font-bold'
            disabled={isLoading} 
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>

          {error && 
            <p className="text-red-500">{error}</p>
          }
        </div>
      </form>
    </main>
  )
}

export default UserAccount
