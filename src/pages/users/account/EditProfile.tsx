import { CCol, CForm, CFormInput, CRow } from '@coreui/react';
import { FormEvent, useState } from 'react';
import { useQueryData, useUserData } from '@layouts';
import { apiClient, ALL_USERS } from '@utils';
import { useMutation } from '@tanstack/react-query';

function EditProfile() {
  const { userData } = useUserData();
  const { queryData } = useQueryData(); 
  const user = Array.isArray(queryData) && queryData.length > 0 ? queryData[0] : null;

  const [email, setEmail] = useState(userData?.email || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '');
  const [address, setAddress] = useState(user?.billingAddress || '');
  const mutation = useMutation({
    mutationFn: (formData: any) => 
      apiClient.post(ALL_USERS, formData),
    onSuccess: () => {
      console.log('Mutation successful');
    }
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      mobile_number: mobileNumber,
      billing_address: address,
    }
    console.log('FORM DATA', requestBody);

    try {
      await mutation.mutateAsync(requestBody);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
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
          <CCol xs>
            <CFormInput 
              id="mobileNumber" 
              label="Mobile Number" 
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder='+639000000000'
              className='field__input'
            />
          </CCol>
          <CCol xs={6}>
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
