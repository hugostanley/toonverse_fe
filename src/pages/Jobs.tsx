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

type Job = {
  id: number;
  order_id: number;
  workforce_id: number;
  claimed_at: string;
  commission: string | number;
  created_at: string;
  updated_at: string;
  status: string;
  email: string;
};

function Jobs() {
  const { data } = useQuery<Job[]>({
    queryKey: ["allJobs"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_JOBS);
      return response.data;
    },
  })

  return (
    <main className="w-full h-[92%] p-4 flex flex-col gap-3">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        Jobs
      </h1>
      <section className="w-full max-h-full px-2 overflow-y-auto">
        <div className="px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
          
          <CTable hover>
            <CTableHead>
              <CTableRow className="text-sm">
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Artist ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Artist Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Commission</CTableHeaderCell>
                <CTableHeaderCell scope="col">Claimed At</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="">
              {data &&
                data.map((job) => (
                  <CTableRow key={job.id} className="text-xs">
                    <CTableHeaderCell
                      scope="row"
                      className="tracking-widest pt-3"
                    >
                      {job.id}
                    </CTableHeaderCell>

                    <CTableDataCell className="pt-3">
                      {job.order_id}
                    </CTableDataCell>

                    <CTableDataCell className="pt-3">
                      {job.workforce_id}
                    </CTableDataCell>

                    <CTableDataCell className="pt-3">
                      {job.email}
                    </CTableDataCell>

                    <CTableDataCell className="pt-3">
                      {job.commission}
                    </CTableDataCell>

                    <CTableDataCell className="pt-3">
                      {formatCreatedAt(job.claimed_at)}
                    </CTableDataCell>

                    <CTableDataCell className="pt-3">
                      {job.status}
                    </CTableDataCell>

                    <CTableDataCell className="pt-3">
                      Deliver Btn
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>


        </div>
      </section>
    </main>
  )
}

export default Jobs
