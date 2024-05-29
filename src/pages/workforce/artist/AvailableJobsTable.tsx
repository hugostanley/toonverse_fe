import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "@utils";
import { Spinner } from "@components";
import { ClaimOrder } from "@pages";

type Order = {
  id: number;
  item_id: number;
  payment_id: number;
  workforce_id: number;
  amount: string;
  order_status: string;
  background_url: string;
  number_of_heads: string;
  picture_style: string;
  art_style: string;
  notes?: string | null;
  reference_image: string;
  latest_artwork?: string | null;
  latest_artwork_revision?: string | null;
  created_at: string;
  updated_at: string;
};

type AvailableJobsTableProps = {
  data: Order[];
  isLoading: boolean;
};

function AvailableJobsTable({ data, isLoading }: AvailableJobsTableProps) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CTable hover>
          <CTableHead>
            <CTableRow className="text-sm">
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Details</CTableHeaderCell>
              <CTableHeaderCell scope="col">Commission</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Status</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">Claim Job</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className="">
            {data &&
              data.map((order) => (
                <CTableRow key={order.id} className="text-xs">
                  <CTableHeaderCell
                    scope="row"
                    className="tracking-widest pt-3"
                  >
                    {order.id}
                  </CTableHeaderCell>

                  <CTableDataCell className="pt-3">
                    <div className="flex flex-col gap-1">
                      <span>Art Style: {order.art_style}</span>
                      <span>Number of Heads: {order.number_of_heads}</span>
                      <span>Picture Style: {order.picture_style}</span>
                      <span>Notes: {order.notes ? order.notes : "N/A"}</span>
                      <Link
                        to={order.background_url}
                        target="_blank"
                        className="underline underline-offset-2 text-blue hover:text-green"
                      >
                        Background Url
                      </Link>
                      <Link
                        to={order.reference_image}
                        target="_blank"
                        className="underline underline-offset-2 text-blue hover:text-green"
                      >
                        <span>Reference Image</span>
                      </Link>
                    </div>
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    ₱ {(parseFloat(order.amount).toFixed(2) * 0.7)}
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    {formatCreatedAt(order.created_at)}
                  </CTableDataCell>

                  {/* <CTableDataCell className="pt-3">
                    {order.order_status}
                  </CTableDataCell> */}

                  <CTableDataCell className="pt-3">
                    {/* TODO: send patch request to individual order endpoint to update order_status fro "queued" to "in_progress" on click of Claim button */}

                    {order.order_status === "queued" ? (
                      <ClaimOrder order={order} />
                    ) : (
                      order.workforce_id
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      )}
    </>
  );
}

export default AvailableJobsTable;
