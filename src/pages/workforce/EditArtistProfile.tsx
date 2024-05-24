import { CButton, CForm, CFormInput, CModalFooter } from '@coreui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { ARTIST_PROFILE, apiClient } from '@utils';
import { useNavigate } from 'react-router-dom';

type Artist = {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  billing_address: string;
  total_earnings: number;
  created_at: string;
  updated_at: string;
  workforce_id: string;
}

type EditArtistProps = {
  artist: Artist;
}

function EditArtistProfile({ artist }: EditArtistProps) {
  const [email, setEmail] = useState(artist?.email || '');
  const [firstName, setFirstName] = useState(artist?.first_name || '');
  const [lastName, setLastName] = useState(artist?.last_name || '');
  const [address, setAddress] = useState(artist?.billing_address || '');
  const [mobile, setMobile] = useState(artist?.mobile_number || '');

  const [mutationError, setMutationError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return apiClient.patch(ARTIST_PROFILE(artist?.id), formData);
    },
    // onSuccess: () => {
    //   // to "update" user profile on account page too
    //   queryClient.invalidateQueries(
    //     {
    //       queryKey: ['currentUserProfile', userData?.id],
    //       exact: true,
    //       refetchType: 'all',
    //     },
    //   )
    //   navigate('/account');
    // }
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      billing_address: address,
      mobile_number: mobile,
    }
    
    try {
      await mutation.mutateAsync(requestBody);
    } catch (error) {
      console.error('Axios Error:', (error as any).response.data.error.join('. '));
      setMutationError((error as any).response.data.error.join('. '));
    }
    
  }
  return (
    <CForm onSubmit={handleSubmit} className="flex flex-col gap-3 px-4">
      <CFormInput 
        type="email" 
        id="inputEmail4" 
        floatingLabel="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email@example.com'
        className='field__input' 
      />

      <CFormInput 
        type="text" 
        id="firstName" 
        floatingLabel="First Name" 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='Juan'
        className='field__input' 
      />

      <CFormInput 
        type="text" 
        id="lastName" 
        floatingLabel="Last Name" 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Cruz'
        className='field__input' 
      />

      <CFormInput 
        type="text" 
        id="inputAddress" 
        floatingLabel="Billing Address" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Lot Block Street, Barangay, City, Province, Country, ZIP Code" 
        className='field__input'
      />

      <CFormInput 
        type="text" 
        id="inputMobile" 
        floatingLabel="Mobile Number" 
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="+639123123123" 
        className='field__input'
      /> 

      {mutationError && 
        mutationError.split('. ').map((error, idx) => (
          <small key={idx} className="text-red-500">{error}.</small>
        ))}

      <CModalFooter>
        <CButton type='submit' color='secondary' className='bg-green' disabled={mutation.isPending}>Save changes</CButton>
      </CModalFooter> 
    </CForm>
  )
}

export default EditArtistProfile
