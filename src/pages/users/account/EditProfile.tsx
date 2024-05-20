import { CCol, CForm, CFormInput, CRow } from '@coreui/react';
import { FormEvent, useState } from 'react';
import { useUserProfile, useUserData } from '@layouts';
import { apiClient, ALL_USERS, USER_PROFILE } from '@utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { userData } = useUserData();
  const { data } = useUserProfile();   
  const navigate = useNavigate();

  const [email, setEmail] = useState(userData?.email || '');
  const [firstName, setFirstName] = useState(data?.first_name || '');
  const [lastName, setLastName] = useState(data?.last_name || '');
  const [address, setAddress] = useState(data?.billing_address || '');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      if (data?.id) {
        return apiClient.patch(USER_PROFILE(data?.id), formData);
      } else {
        return apiClient.post(ALL_USERS, formData);
      }
    },
    onSuccess: () => {
      // to "update" user profile on account page too
      queryClient.invalidateQueries(
        {
          queryKey: ['currentUserProfile', userData?.id],
          exact: true,
          refetchType: 'active',
        },
      )
      navigate('/account');
    }
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      billing_address: address,
    }
    console.log('FORM DATA', requestBody);

    try {
      await mutation.mutateAsync(requestBody);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  console.log('@EDIT/ profile id:', data?.id);

  return (
    <section className='w-full h-full p-2 px-4 flex flex-col gap-2'>
      <h1 className='w-full px-8 py-4 border-b-2 border-gray-400/60 text-3xl font-bold'>
        Edit Profile
      </h1>

      <CForm onSubmit={handleSubmit} className="row g-3 w-5/6 p-8">       
        <CRow className="g-3">
          <CCol xs>
            <CFormInput 
              type="text" 
              id="firtsName" 
              label="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Juan'
              className='field__input' 
            />
          </CCol>
          <CCol xs>
            <CFormInput 
              type="text" 
              id="lastName" 
              label="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Cruz'
              className='field__input' 
            />
          </CCol>
        </CRow>

        <CRow className="g-3">
          <CCol xs>
            <CFormInput 
              type="email" 
              id="inputEmail4" 
              label="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email@example.com'
              className='field__input' 
            />
          </CCol>
          <CCol xs={8}>
            <CFormInput 
              id="inputAddress" 
              label="Billing Address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Lot Block Street, Barangay, City, Province, Country, ZIP Code" 
              className='field__input'
            />
          </CCol>
        </CRow> 
    
        <div className='field__wrapper py-4'>
          <button
            type='submit'
            className='btn__primary bg-blue w-1/4 mt-10 text-white'
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </CForm>
    </section>
  )
}

export default EditProfile
