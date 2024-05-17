import { FormEvent } from 'react';
import { W_LOGOUT_URL } from '@utils';
import { useFetch } from '@hooks';

function Dashboard() {
  const { error, isLoading, fetchData } = useFetch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetchData(W_LOGOUT_URL, { method: 'DELETE' }, '/w/login')
      localStorage.removeItem('Headers');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <section>
      This is the workforce dashboard.

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
    </section>
  )
}

export default Dashboard
