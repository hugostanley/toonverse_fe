import { CFormInput } from '@coreui/react';
import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

function AcceptInviteForm({ user, formClassName, btnColor }: InviteFormProps) {
  const [token] = useSearchParams();
  const invitationToken = token.get('invitation_token') || '';
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>(user?.password || '');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>(user?.password_confirmation || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const requestBody = {
      workforce: {
        invitation_token: invitationToken,
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await apiClient.put(W_INVITATION_PATH, requestBody);

      if (response.status >= 200 && response.status < 300) {
        navigate('/w/login');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    } catch (error) {
      let errorMessages = 'An unexpected error occurred.';
      if ((error as any).response && (error as any).response.data) {
        const responseData = (error as any).response.data;
        if (responseData.errors && responseData.errors.full_messages) {
          errorMessages = responseData.errors.full_messages.join('. ');
        } else if (responseData.errors && Array.isArray(responseData.errors)) {
          errorMessages = responseData.errors.join('. ');
        }
      }
      setError(errorMessages);
      console.error('API Error:', errorMessages);
    } finally {
      setLoading(false);
    }

    // console.log('Query Params:', invitationToken);
    // console.log('Accept Invite Request Body:', requestBody);
  }

  return (
    <section className={formClassName}>
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <CFormInput
          type="password"
          id="floatingPassword"
          floatingLabel="Password"
          placeholder="Password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className={`field__input focus:ring-${btnColor}`}
          disabled={loading}
        />

        <CFormInput
          type="password"
          id="floatingPasswordConfirmation"
          floatingLabel="Confirm Password"
          placeholder="Confirm Password"
          name="password_confirmation"
          value={passwordConfirmation}
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className={` border-2 border-dark focus:border-none focus:ring-4 focus:ring-${btnColor}`}
          disabled={loading}
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="field__wrapper py-4">
          <button type="submit" className={`bg-${btnColor} btn__primary`} disabled={loading}>
            {loading ? <Spinner /> : 'Create Account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AcceptInviteForm
