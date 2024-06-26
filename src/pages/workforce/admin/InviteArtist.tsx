import { FormEvent, useState } from 'react';
import { W_INVITATION_PATH, apiClient } from '@utils';
import { Spinner } from '@components';

type User = {
  email: string;
  password: string;
  password_confirmation: string;
};

type InviteFormProps = {
  user?: User | null;
  formClassName?: string;
  btnColor?: string;
};

function InviteArtist({  user, formClassName, btnColor }: InviteFormProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const requestBody = {
      workforce: {
        email,
      }
    };

    try { 
      const response = await apiClient.post(W_INVITATION_PATH, requestBody);

      if (response.status >= 200 && response.status < 300) {
        setEmail('');
        // console.log(`Successfully invited artist: ${email}`)
      } else {
        throw new Error('An unexpected error occurred.');
      }
    } catch (error) {
      let errorMessages = 'An unexpected error occurred.';
      if ((error as any).response && (error as any).response.data) {
        const responseData = (error as any).response.data;
        if (responseData.error) {
          errorMessages = responseData.error;
        } else if (responseData.errors && Array.isArray(responseData.errors)) {
          errorMessages = responseData.errors.join('. ');
        }
      }
      setError(errorMessages);
      console.error('API Error:', errorMessages);
    } finally {
      setLoading(false);
    }

    // console.log('Invite Artist Request Body:', requestBody);
  }

  return (
    <section className={formClassName}>
      <h1 className='w-full py-2 border-b-2 border-ivory/65 flex justify-between text-3xl tracking-widest font-bold text-ivory'>Invite an Artist</h1>
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <label className='text-ivory tracking-widest font-bold'>Email</label>
        <input
          type="email"
          id="floatingEmail"
          placeholder="email@example.com"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 rounded-lg shadow-md field__input focus:ring-${btnColor}`}
          disabled={loading}
        />

        {error && <p className="text-red-100">{error}</p>}

        <div className="field__wrapper py-4">
          <button type="submit" className={`bg-${btnColor} btn__primary`} disabled={loading}>
            {loading ? <Spinner /> : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default InviteArtist
