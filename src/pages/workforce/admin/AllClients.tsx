import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import { ALL_USERS, apiClient } from "@utils";
import { EditClient } from "@pages";
import { Spinner } from "@components";

type Client = {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  billing_address: string;
  created_at: string;
  updated_at: string;
};

function AllClients() {
  const { data, isLoading } = useQuery<Client[]>({
    queryKey: ["allClients"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_USERS);
      return response.data;
    },
  });

  return (
    <main className="w-full h-[92%] p-4 flex flex-col gap-3">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        All Clients
      </h1>

      {isLoading ? (
        <section className="h-full w-full grid place-items-center">
          <Spinner />
        </section>
      ) : (
        <section className="w-full h-fit px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Profile ID</CTableHeaderCell> 
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Billing Address</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="">
              {data &&
                data.map((client) => (
                  <CTableRow key={client.id} className="">
                    <CTableHeaderCell
                      scope="row"
                      className="tracking-widest pt-3"
                    >
                      {client.id}
                    </CTableHeaderCell>
                    <CTableDataCell className="pt-3">
                      {client.email}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {client.last_name}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {client.first_name}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {client.billing_address}
                    </CTableDataCell>
                    <CTableDataCell>
                      <EditClient client={client} />
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </section>
      )}
      
      
      



    </main>
  )
}

export default AllClients
