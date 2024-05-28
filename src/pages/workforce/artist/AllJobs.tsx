import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import { ALL_JOBS, apiClient, formatCreatedAt } from "@utils";
import { Spinner } from "@components";

type Jobs = {
  id: number;
  order_id: number;
  workforce_id: number;
  claimed_at: string;
  commission: string;
  created_at: string;
  updated_at: string;
  status: string;
  email: string;
};

function AllJobs() {
  const { data, isLoading } = useQuery<Jobs[]>({
    queryKey: ["allJobs"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_JOBS);
      return response.data;
    },
  });

  return (
    <main className="w-full h-full p-4 flex flex-col gap-3 bg-ivory">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        All Jobs
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
                <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Commission</CTableHeaderCell>
                <CTableHeaderCell scope="col">Claim Timestamp</CTableHeaderCell>
                <CTableHeaderCell scope="col">Artwork</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="">
              {data &&
                data.map((job) => (
                  <CTableRow key={job.id} className="">
                    <CTableHeaderCell
                      scope="row"
                      className="tracking-widest py-3"
                    >
                      {job.id}
                    </CTableHeaderCell>
                    <CTableDataCell className="py-3">
                      {job.order_id}
                    </CTableDataCell>
                    <CTableDataCell className="py-3">
                      {job.commission}
                    </CTableDataCell>
                    <CTableDataCell className="py-3">
                      {formatCreatedAt(job.claimed_at)}
                    </CTableDataCell>
                    <CTableDataCell className="py-3">
                      <button className="btn__primary bg-orange">
                        Upload Artwork
                      </button>
                    </CTableDataCell>
                    <CTableDataCell className="py-3">
                      {job.status}
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

export default AllJobs;
