import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ALL_JOBS,
  apiClient,
  formatCreatedAt,
  statusColors,
  baseURL,
} from "@utils";
import { Spinner, FileUploadModal } from "@components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

type Jobs = {
  id: number;
  order_id: number;
  workforce_id: number;
  claimed_at: string;
  commission: string;
  created_at: string;
  updated_at: string;
  status: "queued" | "in_progress" | "delivered" | "completed";
  email: string;
  latest_artwork?: string | null;
  latest_artwork_revision?: string | null;
};

type Target = {
  job_id: number | null;
  order_id: number | null;
};

function ArtistJobsTable() {
  const [fileUploadModal, setFileUploadModal] = useState(false);
  const [target, setTarget] = useState<Target>({
    job_id: null,
    order_id: null,
  });
  const { data, isLoading } = useQuery<Jobs[]>({
    queryKey: ["allJobs"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_JOBS);
      return response.data;
    },
  });

  return (
    <div className="w-full h-full flex flex-col gap-3 relative">
      <FileUploadModal
        modalFileUpload={fileUploadModal}
        handleClose={() => setFileUploadModal(!fileUploadModal)}
        target={target}
      />
      
      {isLoading ? (
        <div className="h-full w-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-fit px-3 py-3 cursor-default bg-white border-green/50 border-2 rounded-2xl">
          <CTable hover>
            <CTableHead>
              <CTableRow className="text-sm">
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Commission</CTableHeaderCell>
                <CTableHeaderCell scope="col">Claim Timestamp</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Latest Artwork</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="text-xs">
              {data &&
                data.map((job) => (
                  <CTableRow key={job.id}>
                    <CTableHeaderCell
                      scope="row"
                      className="tracking-widest py-3 max-w-[100px]"
                    >
                      {job.id}
                    </CTableHeaderCell>
                    <CTableDataCell className="py-3 w-[100px]">
                      {job.order_id}
                    </CTableDataCell>
                    <CTableDataCell className="py-3 w-[120px]">
                      ₱ {parseFloat(job.commission).toFixed(2)}
                    </CTableDataCell>
                    <CTableDataCell className="py-3 max-w-[150px] text-pretty">
                      {formatCreatedAt(job.claimed_at)}
                    </CTableDataCell>
                    <CTableDataCell className="py-3 max-w-[120px]">
                      <button
                        className="btn__primary bg-pink w-fit"
                        onClick={() => {
                          setFileUploadModal(true);
                          setTarget({
                            ...target,
                            job_id: job.id,
                            order_id: job.order_id,
                          });
                          console.log(
                            `TARGET ID:${target.job_id} ORDER:${target.order_id}`
                          );
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <FontAwesomeIcon icon={faUpload} />
                          Upload Artwork
                        </div>
                        
                      </button>
                    </CTableDataCell>
                    <CTableDataCell className="py-3">
                      {job.latest_artwork && (
                        <Link
                          to={`${baseURL}${job.latest_artwork}`}
                          className="w-2/3 btn__primary bg-yellow text-center"
                          target="_blank"
                        >
                          {`REV 0${job.latest_artwork_revision}`}
                        </Link>
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="py-3">
                      <div
                        className={`w-[65%] text-ivory btn__primary bg-${
                          statusColors[job.status]
                        }`}
                      >
                        {job.status}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </div>
      )}
    </div>
  );
}

export default ArtistJobsTable;
