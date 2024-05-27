import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import { ALL_ORDERS, apiClient } from "@utils";
import { Spinner } from "@components";

type Order = {
  id: number;
  item_id: number;
  payment_id: number;
  workforce_id: number;
  amount: number;
  order_status: string;
  background_url: string;
  number_of_heads: string;
  picture_style: string;
  art_style: string;
  notes?: string | null;
  reference_image: string;
  created_at: string;
  updated_at: string;
}

function OrdersTable() {
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ORDERS);
      return response.data;
    }
  });
  return (
    <>
    { isLoading ? <Spinner /> :
      <CTable hover>
        <CTableHead>
          <CTableRow>
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
              <CTableRow key={order.id} className="">
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
                {order.workforce_id}
                </CTableDataCell>

                <CTableDataCell className="pt-3">
                  <div className="flex flex-col gap-2">
                    <small>
                      Art Style: {order.art_style}
                    </small>
                    <small>
                      Background: {order.background_url}
                    </small>
                    <small>
                      Number of Heads: {order.number_of_heads}
                    </small>
                    <small>
                      Picture Style: {order.picture_style}
                    </small>
                    <small>
                      Reference Image: {order.reference_image}
                    </small>
                    <small>
                      Notes: {order.notes ? order.notes : "N/A"}
                    </small>
                  </div>
                </CTableDataCell>

                <CTableDataCell className="pt-3">
                  {order.amount}
                </CTableDataCell>

                <CTableDataCell className="pt-3">
                  {order.created_at}
                </CTableDataCell>

                <CTableDataCell className="pt-3">
                  {/* artwork url from artwork table */}
                </CTableDataCell> 

                <CTableDataCell className="pt-3">
                  {order.order_status}
                </CTableDataCell>

                <CTableDataCell className="">
                  {/* TODO: send patch request to individual order endpoint to update order_status fro "queued" to "in_progress" on click of Claim button */}
                  { order.order_status === "queued" ?
                      <CButton
                      type="submit"
                      color="secondary"
                      className="bg-green"
                    >
                      Claim
                    </CButton>
                  : 
                    order.order_status
                  }
                </CTableDataCell>
              </CTableRow>
            ))
          }
        </CTableBody>
      </CTable>
    }
    </>
  )
}

export default OrdersTable
