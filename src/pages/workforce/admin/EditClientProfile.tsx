import { CButton, CForm, CFormInput, CModalFooter } from "@coreui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { apiClient, USER_PROFILE } from "@utils";

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
  setVisible: (visible: boolean) => void;
};

function EditClientProfile({ client, setVisible }: EditClientProps) {
  const [email, setEmail] = useState(client?.email || "");
  const [firstName, setFirstName] = useState(client?.first_name || "");
  const [lastName, setLastName] = useState(client?.last_name || "");
  const [address, setAddress] = useState(client?.billing_address || "");

  const [mutationError, setMutationError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return apiClient.patch(USER_PROFILE(client?.id), formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allClients"],
        exact: true,
        refetchType: "all",
      });
      setVisible(false);
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      billing_address: address,
    };

    try {
      await mutation.mutateAsync(requestBody);
    } catch (error) {
      console.error(
        "Axios Error:",
        (error as any).response.data.error.join(". ")
      );
      setMutationError((error as any).response.data.error.join(". "));
    }
  }
  return (
    <CForm onSubmit={handleSubmit} className="flex flex-col gap-3 px-4">
      <CFormInput
        type="email"
        id="inputEmail"
        floatingLabel="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
        className="field__input"
      />

      <CFormInput
        type="text"
        id="firstName"
        floatingLabel="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Juan"
        className="field__input"
      />

      <CFormInput
        type="text"
        id="lastName"
        floatingLabel="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Cruz"
        className="field__input"
      />

      <CFormInput
        type="text"
        id="inputAddress"
        floatingLabel="Billing Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Lot Block Street, Barangay, City, Province, Country, ZIP Code"
        className="field__input"
      />

      {mutationError &&
        mutationError.split(". ").map((error, idx) => (
          <small key={idx} className="text-red-500">
            {error}.
          </small>
        ))}

      <CModalFooter>
        <CButton
          type="submit"
          color="secondary"
          className="bg-green"
          disabled={mutation.isPending}
        >
          Save changes
        </CButton>
      </CModalFooter>
    </CForm>
  );
}

export default EditClientProfile
