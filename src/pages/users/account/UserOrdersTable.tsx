import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { formatCreatedAt, baseURL } from "@utils";
import { Spinner } from "@components";

type Order = {
  id: number;
  item_id: number;
  payment_id: number;
  workforce_id: number;
  amount: string;
  order_status: 'queued' | 'in_progress' | 'delivered' | 'completed';
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

type OrdersTableProps = {
  data: Order[];
  isLoading: boolean;
};

function UserOrdersTable({ data, isLoading }: OrdersTableProps) {
  const statusColors = {
    queued: 'gray',
    in_progress: 'orange',
    delivered: 'blue',
    completed: 'green',
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CTable hover>
          <CTableHead>
            <CTableRow className="text-sm">
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Details</CTableHeaderCell>
              <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
              <CTableHeaderCell scope="col">Payment Timestamp</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
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
                    <div className={`btn__primary bg-${statusColors[order.order_status]}`}>
                      {order.order_status}
                    </div>
                  </CTableDataCell>
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
                    {order.amount}
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    {formatCreatedAt(order.created_at)}
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    <span>
                    {order.latest_artwork && order.order_status == "delivered" && (
                      <Link
                        to={`${baseURL}${order.latest_artwork}`}
                        className="btn__primary bg-blue text-white"
                        target="_blank"
                      >
                        Artwork Link
                      </Link>
                    )}
                    </span>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      )}
    </>
  );
}

export default UserOrdersTable;
