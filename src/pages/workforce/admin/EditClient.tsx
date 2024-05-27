import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useState } from "react";
import { EditClientProfile } from "@pages";

type Client = {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  billing_address: string;
  created_at: string;
  updated_at: string;
};

type EditClientProps = {
  client: Client;
};

function EditClient({ client }: EditClientProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CButton
        color="secondary"
        className="bg-green"
        onClick={() => setVisible(!visible)}
      >
        Edit
      </CButton>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample" className="text-2xl pt-2">
            Edit Client Profile
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <EditClientProfile client={client} setVisible={setVisible} />
        </CModalBody>
      </CModal>
    </>
  );
}

export default EditClient
