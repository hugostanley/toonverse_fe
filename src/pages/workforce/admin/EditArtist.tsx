import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useState } from 'react';
import EditArtistProfile from '../EditArtistProfile';

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

function EditArtist({ artist }: EditArtistProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CButton color='secondary' className='bg-green' onClick={() => setVisible(!visible)}>Edit</CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample" className='text-2xl pt-2'>Edit Artist Profile</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <EditArtistProfile artist={artist} />
        </CModalBody>
        {/* <CModalFooter>
          <CButton color='secondary' className='bg-green'>Save changes</CButton>
        </CModalFooter> */}
      </CModal>
    </>
  )
}

export default EditArtist
