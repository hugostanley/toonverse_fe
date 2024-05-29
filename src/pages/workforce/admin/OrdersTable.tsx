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

type OrdersTableProps = {
  data: Order[];
  isLoading: boolean;
}


function OrdersTable({ data, isLoading }: OrdersTableProps) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CTable hover>
          <CTableHead>
            <CTableRow className="text-sm">
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Item ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Payment ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Details</CTableHeaderCell>
              <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
              <CTableHeaderCell scope="col">Latest Artwork</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Artist ID</CTableHeaderCell>
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
                    {order.item_id}
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    {order.payment_id}
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    <div className="flex flex-col gap-1">
                      <span>Art Style: {order.art_style}</span>                      
                      <span>Number of Heads: {order.number_of_heads}</span>
                      <span>Picture Style: {order.picture_style}</span>
                      <span>Notes: {order.notes ? order.notes : "N/A"}</span>    
                      <Link to={order.background_url} target="_blank" className="underline underline-offset-2 text-blue hover:text-green">Background Url</Link>
                      <Link to={order.reference_image} target="_blank" className="underline underline-offset-2 text-blue hover:text-green">
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
                    {/* <span>{order.latest_artwork_revision}:  {order.latest_artwork}</span> */}
                    {order.latest_artwork && (
                      <Link
                        to={`${baseURL}${order.latest_artwork}`}
                        className="text-blue underline"
                        target="_blank"
                      >
                        {`REV ${order.latest_artwork_revision}: Artwork Link`}
                      </Link>
                    )}
                  
                  </CTableDataCell>

                  <CTableDataCell className="pt-3">
                    {order.order_status}
                  </CTableDataCell>

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

export default OrdersTable
