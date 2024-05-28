import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import { ALL_ARTISTS, apiClient } from "@utils";
import { Spinner } from "@components";
import { EditArtist } from "@pages";

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
};

function AllArtists() {
  const { data, isLoading } = useQuery<Artist[]>({
    queryKey: ["allArtists"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTISTS);
      return response.data;
    },
  });

  return (
    <main className="w-full h-[92%] p-4 flex flex-col gap-3">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        All Artists
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
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Billing Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total Earnings</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="">
              {data &&
                data.map((artist) => (
                  <CTableRow key={artist.id} className="">
                    <CTableHeaderCell
                      scope="row"
                      className="tracking-widest pt-3"
                    >
                      {artist.workforce_id}
                    </CTableHeaderCell>
                    <CTableDataCell className="pt-3">
                      {artist.email}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {artist.last_name}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {artist.first_name}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {artist.billing_address}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      +63{artist.mobile_number}
                    </CTableDataCell>
                    <CTableDataCell className="pt-3">
                      {artist.total_earnings}
                    </CTableDataCell>
                    <CTableDataCell>
                      <EditArtist artist={artist} />
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </section>
      )}
    </main>
  );
}

export default AllArtists;
