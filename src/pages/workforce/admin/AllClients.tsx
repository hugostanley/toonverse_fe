import { useQuery } from "@tanstack/react-query";
import { ALL_USERS, apiClient } from "@utils";
import { EditClient } from "@pages";
import { Spinner } from "@components";
import DataTable from "react-data-table-component";

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

  const customStyles = {
    headCells: {
      style: {
        fontSize: "0.85rem",
        fontWeight: "900",
      },
    },
    rows: {
      style: {
        fontSize: "0.75rem",
      },
    },
  };

  const columns = [
    {
      name: "ID",
      maxWidth: "100px",
      style: {
        fontWeight: "900",
      },
      sortable: true,
      selector: (row: Client) => row.id
    },
    {
      name: "Email",
      style: {
        fontWeight: "900",
      },
      sortable: true,
      selector: (row: Client) => row.email
    },
    {
      name: "First Name",
      sortable: true,
      selector: (row: Client) => row.first_name
    },
    {
      name: "Last Name",
      sortable: true,
      selector: (row: Client) => row.last_name
    },
    {
      name: "Billing Address",
      selector: (row: Client) => row.billing_address
    },
    {
      name: "",
      width: "150px",
      cell: (row: Client) => (
        <div>
          <EditClient client={row} />
        </div>
      )
    },
  ]

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
          <DataTable
            columns={columns}
            data={data || []}
            customStyles={customStyles}
            fixedHeader
            pagination 
            paginationPerPage={10} 
            paginationRowsPerPageOptions={[10, 20, 30]}
            defaultSortFieldId={0}
          />          
        </section>
      )}
      
      
      



    </main>
  )
}

export default AllClients
